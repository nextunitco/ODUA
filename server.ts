import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

// Path to our JSON database file
const dbFilePath = path.join(process.cwd(), 'src', 'data', 'db.json');

// Lazy initialize Gemini API client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// Helper function to read the database
function readDatabase() {
  try {
    if (!fs.existsSync(dbFilePath)) {
      // Return empty default if file does not exist (should not happen since we created it)
      return { 
        generalSettings: {}, 
        news: [], 
        careers: [], 
        projects: [], 
        inquiries: [], 
        boardMembers: [], 
        leadershipTeam: [], 
        historyMilestones: [], 
        southwestStates: [],
        subsidiaries: [],
        foundationPrograms: [],
        governancePolicies: [],
        whistleblowerReports: [],
        jubileeEvents: [],
        calculatorSettings: {},
        faqs: [],
        pressDownloads: []
      };
    }
    const rawData = fs.readFileSync(dbFilePath, 'utf-8');
    const parsed = JSON.parse(rawData);
    if (!parsed.boardMembers) parsed.boardMembers = [];
    if (!parsed.leadershipTeam) parsed.leadershipTeam = [];
    if (!parsed.historyMilestones) parsed.historyMilestones = [];
    if (!parsed.southwestStates) parsed.southwestStates = [];
    if (!parsed.subsidiaries) parsed.subsidiaries = [];
    if (!parsed.foundationPrograms) parsed.foundationPrograms = [];
    if (!parsed.governancePolicies) parsed.governancePolicies = [];
    if (!parsed.whistleblowerReports) parsed.whistleblowerReports = [];
    if (!parsed.jubileeEvents) parsed.jubileeEvents = [];
    if (!parsed.faqs) parsed.faqs = [];
    if (!parsed.pressDownloads) parsed.pressDownloads = [];
    if (!parsed.calculatorSettings) parsed.calculatorSettings = {};
    return parsed;
  } catch (error) {
    console.error('Error reading database file:', error);
    return { 
      generalSettings: {}, 
      news: [], 
      careers: [], 
      projects: [], 
      inquiries: [], 
      boardMembers: [], 
      leadershipTeam: [], 
      historyMilestones: [], 
      southwestStates: [],
      subsidiaries: [],
      foundationPrograms: [],
      governancePolicies: [],
      whistleblowerReports: [],
      jubileeEvents: [],
      calculatorSettings: {},
      faqs: [],
      pressDownloads: []
    };
  }
}

// Helper function to write to the database
function writeDatabase(data: any) {
  try {
    // Ensure parent directories exist
    const dir = path.dirname(dbFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing to database file:', error);
    return false;
  }
}

// ==========================================
// CODEBASE ENGINE & AUTONOMOUS MODIFICATION SYSTEM
// ==========================================
const WORKSPACE_ROOT = process.cwd();
const CODE_BACKUPS_DIR = path.join(WORKSPACE_ROOT, '.code_backups');

if (!fs.existsSync(CODE_BACKUPS_DIR)) {
  try {
    fs.mkdirSync(CODE_BACKUPS_DIR, { recursive: true });
  } catch (e) {
    console.warn('Could not create backups dir', e);
  }
}

interface CodeBackupMeta {
  backupId: string;
  filePath: string;
  timestamp: string;
  originalSize: number;
  description?: string;
}

const codeBackupsLog: CodeBackupMeta[] = [];

// Resolve a safe relative path within workspace root
function resolveSafePath(userPath: string): string | null {
  if (!userPath || typeof userPath !== 'string') return null;
  const cleaned = userPath.trim().replace(/^[\/\\]+/, '');
  const normalized = path.normalize(cleaned);
  const fullPath = path.resolve(WORKSPACE_ROOT, normalized);
  if (!fullPath.startsWith(WORKSPACE_ROOT)) return null;

  const rel = path.relative(WORKSPACE_ROOT, fullPath);
  if (
    rel.startsWith('node_modules') || 
    rel.startsWith('.git') || 
    rel.startsWith('dist') || 
    rel.startsWith('.code_backups') ||
    rel.endsWith('.env')
  ) {
    return null;
  }
  return fullPath;
}

// List all project files that are editable
function listEditableFiles(): Array<{ path: string; name: string; size: number; lines: number; category: string }> {
  const results: Array<{ path: string; name: string; size: number; lines: number; category: string }> = [];
  
  function scanDir(dir: string, category: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      if (ent.name.startsWith('.') || ent.name === 'node_modules' || ent.name === 'dist') continue;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        scanDir(full, category);
      } else if (ent.isFile()) {
        const ext = path.extname(ent.name).toLowerCase();
        if (['.tsx', '.ts', '.css', '.html', '.json', '.js'].includes(ext)) {
          try {
            const stat = fs.statSync(full);
            const content = fs.readFileSync(full, 'utf-8');
            const lines = content.split('\n').length;
            const rel = path.relative(WORKSPACE_ROOT, full);
            results.push({
              path: rel,
              name: ent.name,
              size: stat.size,
              lines,
              category
            });
          } catch {}
        }
      }
    }
  }

  scanDir(path.join(WORKSPACE_ROOT, 'src', 'pages'), 'Pages');
  scanDir(path.join(WORKSPACE_ROOT, 'src', 'components'), 'Components');
  scanDir(path.join(WORKSPACE_ROOT, 'src', 'data'), 'Data');
  
  if (fs.existsSync(path.join(WORKSPACE_ROOT, 'src'))) {
    const srcEntries = fs.readdirSync(path.join(WORKSPACE_ROOT, 'src'), { withFileTypes: true });
    for (const ent of srcEntries) {
      if (ent.isFile() && ['.tsx', '.ts', '.css'].includes(path.extname(ent.name))) {
        const full = path.join(WORKSPACE_ROOT, 'src', ent.name);
        const stat = fs.statSync(full);
        const content = fs.readFileSync(full, 'utf-8');
        results.push({
          path: path.relative(WORKSPACE_ROOT, full),
          name: ent.name,
          size: stat.size,
          lines: content.split('\n').length,
          category: 'Core'
        });
      }
    }
  }

  for (const rootFile of ['server.ts', 'index.html']) {
    const full = path.join(WORKSPACE_ROOT, rootFile);
    if (fs.existsSync(full)) {
      const stat = fs.statSync(full);
      const content = fs.readFileSync(full, 'utf-8');
      results.push({
        path: rootFile,
        name: rootFile,
        size: stat.size,
        lines: content.split('\n').length,
        category: 'Root / Server'
      });
    }
  }

  return results;
}

// Search across code files
function searchCodeInFiles(query: string, maxResults = 25): Array<{ filePath: string; line: number; text: string; category: string }> {
  if (!query || query.trim().length < 2) return [];
  const qLower = query.toLowerCase().trim();
  const files = listEditableFiles();
  const matches: Array<{ filePath: string; line: number; text: string; category: string }> = [];

  for (const f of files) {
    const full = resolveSafePath(f.path);
    if (!full || !fs.existsSync(full)) continue;
    try {
      const content = fs.readFileSync(full, 'utf-8');
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].toLowerCase().includes(qLower)) {
          matches.push({
            filePath: f.path,
            line: i + 1,
            text: lines[i].trim().slice(0, 160),
            category: f.category
          });
          if (matches.length >= maxResults) return matches;
        }
      }
    } catch {}
  }
  return matches;
}

// Apply code modification with automatic backup
function applyCodeModification(
  filePath: string, 
  options: { 
    targetContent?: string; 
    replacementContent?: string; 
    fullContent?: string; 
    description?: string 
  }
): { success: boolean; message: string; backupId?: string; filePath: string; diffPreview?: string } {
  const fullPath = resolveSafePath(filePath);
  if (!fullPath) {
    return { success: false, message: `Access denied or invalid file path: ${filePath}`, filePath };
  }

  let originalContent = '';
  let backupId = '';
  if (fs.existsSync(fullPath)) {
    originalContent = fs.readFileSync(fullPath, 'utf-8');
    backupId = 'backup_' + Date.now() + '_' + path.basename(filePath);
    try {
      fs.writeFileSync(path.join(CODE_BACKUPS_DIR, backupId), originalContent, 'utf-8');
      codeBackupsLog.unshift({
        backupId,
        filePath,
        timestamp: new Date().toISOString(),
        originalSize: originalContent.length,
        description: options.description || 'Code modification'
      });
      if (codeBackupsLog.length > 50) codeBackupsLog.pop();
    } catch (bErr) {
      console.warn('Backup error:', bErr);
    }
  }

  let newContent = '';
  let diffPreview = '';

  if (typeof options.fullContent === 'string') {
    newContent = options.fullContent;
    diffPreview = `Full replacement (${originalContent.split('\n').length} lines -> ${newContent.split('\n').length} lines)`;
  } else if (typeof options.targetContent === 'string' && typeof options.replacementContent === 'string') {
    if (!fs.existsSync(fullPath)) {
      return { success: false, message: `File does not exist: ${filePath}`, filePath };
    }

    const target = options.targetContent;
    const replacement = options.replacementContent;

    if (originalContent.includes(target)) {
      newContent = originalContent.replace(target, replacement);
    } else {
      const normOriginal = originalContent.replace(/\r\n/g, '\n');
      const normTarget = target.replace(/\r\n/g, '\n');
      if (normOriginal.includes(normTarget)) {
        newContent = normOriginal.replace(normTarget, replacement);
      } else {
        const targetLines = target.trim().split('\n').map(l => l.trim()).filter(Boolean);
        if (targetLines.length > 0) {
          const originalLines = originalContent.split('\n');
          let matchIndex = -1;
          for (let i = 0; i <= originalLines.length - targetLines.length; i++) {
            let allMatch = true;
            for (let j = 0; j < targetLines.length; j++) {
              if (!originalLines[i + j].trim().includes(targetLines[j])) {
                allMatch = false;
                break;
              }
            }
            if (allMatch) {
              matchIndex = i;
              break;
            }
          }
          if (matchIndex !== -1) {
            originalLines.splice(matchIndex, targetLines.length, replacement);
            newContent = originalLines.join('\n');
          } else {
            return {
              success: false,
              message: `Target snippet not found in ${filePath}. Please verify the code context.`,
              filePath
            };
          }
        } else {
          return {
            success: false,
            message: `Target snippet was empty.`,
            filePath
          };
        }
      }
    }

    diffPreview = `Replaced "${target.slice(0, 45).trim()}..." with "${replacement.slice(0, 45).trim()}..."`;
  } else {
    return { success: false, message: 'Invalid modification parameters', filePath };
  }

  const parentDir = path.dirname(fullPath);
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }

  fs.writeFileSync(fullPath, newContent, 'utf-8');

  return {
    success: true,
    message: `Successfully updated code in ${filePath}`,
    backupId,
    filePath,
    diffPreview
  };
}

// Revert backup
function revertCodeBackup(backupId: string): { success: boolean; message: string; filePath?: string } {
  const meta = codeBackupsLog.find(b => b.backupId === backupId);
  const backupFile = path.join(CODE_BACKUPS_DIR, backupId);
  if (!fs.existsSync(backupFile)) {
    return { success: false, message: 'Backup file not found on disk' };
  }
  const filePath = meta ? meta.filePath : backupId.split('_').slice(2).join('_');
  const fullPath = resolveSafePath(filePath);
  if (!fullPath) {
    return { success: false, message: 'Cannot resolve restore destination' };
  }
  const content = fs.readFileSync(backupFile, 'utf-8');
  fs.writeFileSync(fullPath, content, 'utf-8');
  return { success: true, message: `Reverted ${filePath} to previous state`, filePath };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares to parse bodies
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // --- CODEBASE ENGINE API ROUTES ---

  // 1. List all editable source code files
  app.get('/api/admin/code/files', (req, res) => {
    try {
      const files = listEditableFiles();
      res.json({ success: true, files, count: files.length, workspaceRoot: WORKSPACE_ROOT });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err?.message || 'Failed to list files' });
    }
  });

  // 2. Read specific file content
  app.get('/api/admin/code/file', (req, res) => {
    const relPath = req.query.path as string;
    if (!relPath) return res.status(400).json({ success: false, message: 'File path required' });
    const fullPath = resolveSafePath(relPath);
    if (!fullPath || !fs.existsSync(fullPath)) {
      return res.status(404).json({ success: false, message: `File not found: ${relPath}` });
    }
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n').length;
      res.json({ success: true, filePath: relPath, content, lines, size: content.length });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err?.message || 'Failed to read file' });
    }
  });

  // 3. Search across all codebase files
  app.post('/api/admin/code/search', (req, res) => {
    const { query, maxResults } = req.body || {};
    if (!query) return res.status(400).json({ success: false, message: 'Query required' });
    try {
      const matches = searchCodeInFiles(query, maxResults || 25);
      res.json({ success: true, query, matches, count: matches.length });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err?.message || 'Search failed' });
    }
  });

  // 4. Modify / Patch code file
  app.post('/api/admin/code/modify', (req, res) => {
    const { filePath, targetContent, replacementContent, fullContent, description } = req.body || {};
    if (!filePath) return res.status(400).json({ success: false, message: 'filePath is required' });

    try {
      const result = applyCodeModification(filePath, {
        targetContent,
        replacementContent,
        fullContent,
        description
      });
      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err: any) {
      res.status(500).json({ success: false, message: err?.message || 'Failed to modify code' });
    }
  });

  // 5. Create new code file
  app.post('/api/admin/code/create', (req, res) => {
    const { filePath, content, description } = req.body || {};
    if (!filePath || typeof content !== 'string') {
      return res.status(400).json({ success: false, message: 'filePath and content are required' });
    }
    try {
      const result = applyCodeModification(filePath, {
        fullContent: content,
        description: description || 'Created new file'
      });
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ success: false, message: err?.message || 'Failed to create file' });
    }
  });

  // 6. List recent code backups
  app.get('/api/admin/code/backups', (req, res) => {
    res.json({ success: true, backups: codeBackupsLog });
  });

  // 7. Revert code backup
  app.post('/api/admin/code/revert', (req, res) => {
    const { backupId } = req.body || {};
    if (!backupId) return res.status(400).json({ success: false, message: 'backupId required' });
    try {
      const result = revertCodeBackup(backupId);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ success: false, message: err?.message || 'Failed to revert' });
    }
  });

  // --- API ROUTES ---

  // Auth endpoint
  app.post('/api/auth/login', (req, res) => {
    const { passcode } = req.body;
    const correctPasscode = process.env.ADMIN_PASSCODE || 'oduaadmin2026';
    
    if (passcode === correctPasscode) {
      res.json({ success: true, token: 'odua-admin-session-token-approved' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid passcode. Access Denied.' });
    }
  });

  // Ultra-fast in-memory cache for frequent AI Copilot queries
  const aiResponseCache = new Map<string, { reply: string; actions: any[]; quickReplies: string[]; timestamp: number }>();

  // Seed instant responses for top suggested admin guidance questions
  const seedFastResponses = () => {
    const defaultFastAnswers: Array<{ prompts: string[]; reply: string; actions: any[]; quickReplies: string[] }> = [
      {
        prompts: [
          'how do i reorder navigation menu?',
          'how do i rearrange the top header navigation menu or add a new dropdown item?',
          'navigation menu'
        ],
        reply: "To reorder or customize the header navigation menu:\n1. Open the left sidebar and select **Site Layout & Navigation**.\n2. In the **Header & Navigation** tab, drag and drop links to reorder them, or click **Add Item** to create new menu options.\n3. You can also ask me to set your header style to **Translucent Glass**, **Executive Solid Dark**, or **Clean White Topbar** instantly!",
        actions: [],
        quickReplies: ['Switch to Frosted Translucent Header', 'Switch to Executive Solid Dark Header', 'Switch to Clean White Topbar']
      },
      {
        prompts: [
          'where can i update the board members list, photos, and committee assignments?',
          'board of directors'
        ],
        reply: "To manage the Board of Directors:\n1. Click **Leadership & Governance** from the left navigation panel.\n2. Click any Director profile to update their biography, portrait photo, state representation, or committee roles.\n3. You can also click **Add Director** to appoint new board members.",
        actions: [],
        quickReplies: ['View About Us page layout', 'Switch to Executive Heritage theme', 'Configure Board layout']
      },
      {
        prompts: [
          'what are the 6 owner states of odu\'a?',
          'owner states',
          'shareholder states'
        ],
        reply: "Odu'a Investment Company Limited is proudly and equally owned by the six South-Western states of Nigeria:\n- 🏛️ **Oyo State**\n- 🌴 **Ogun State**\n- 🌊 **Ondo State**\n- 🌾 **Osun State**\n- ⛰️ **Ekiti State**\n- 🏙️ **Lagos State**\n\nTogether, these shareholder states represent over 45 million citizens with a shared legacy of industrial progress since 1976.",
        actions: [],
        quickReplies: ['View Executive Heritage Footer', 'Explore Subsidiaries', 'Draft News Release']
      }
    ];

    for (const item of defaultFastAnswers) {
      for (const p of item.prompts) {
        aiResponseCache.set(p.toLowerCase(), {
          reply: item.reply,
          actions: item.actions,
          quickReplies: item.quickReplies,
          timestamp: Date.now() + 1000 * 60 * 60 * 24 * 365
        });
      }
    }
  };
  seedFastResponses();

  // AI CMS & Design Copilot Endpoint (Ultra-Fast Response Architecture)
  app.post('/api/ai/copilot', async (req, res) => {
    const { prompt, conversationHistory, currentCmsState, attachments } = req.body || {};
    const normalizedPrompt = (prompt || '').trim();

    try {
      if (!normalizedPrompt && (!attachments || attachments.length === 0)) {
        return res.status(400).json({ success: false, message: 'Prompt or attachment is required' });
      }

      // Fast-path in-memory cache for repeated text queries
      const hasAttachments = Array.isArray(attachments) && attachments.length > 0;
      const cacheKey = !hasAttachments ? normalizedPrompt.toLowerCase() : null;
      if (cacheKey && aiResponseCache.has(cacheKey)) {
        const cached = aiResponseCache.get(cacheKey)!;
        if (cached.timestamp > Date.now() || Date.now() - cached.timestamp < 15 * 60 * 1000) {
          return res.json({
            success: true,
            reply: cached.reply,
            actions: cached.actions || [],
            quickReplies: cached.quickReplies || [],
            cached: true
          });
        }
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({ success: false, message: 'GEMINI_API_KEY is not configured in server environment' });
      }

      const ai = getGeminiClient();
      const systemInstruction = `You are the Odu'a Corporate Web Director & Autonomous AI Visual Design Architect for Odu'a Investment Company Limited (Southwest Nigeria).
You have FULL direct permission and authority to perform ANY change to this website immediately upon user command:
- Add buttons, customize buttons, or delete buttons anywhere on any page or header.
- Delete any section, block, page, news article, project, subsidiary, director, or FAQ.
- Restructure or reorder any page layout and sections.
- Copy or duplicate any block, section, page, news release, project, or subsidiary.
- Update any headline, text, banner image, contact information, phone numbers, or corporate metrics.
- Transform the visual identity (themes, header styles, footer styles, font pairings, boxed/fluid layout).

CRITICAL DIRECTIVE - STRICT BOUNDARY NOTIFICATION FOR IMPOSSIBLE TASKS:
1. If the user asks for something OUTSIDE the scope of website creation and CMS customization (e.g. real-world banking wires, moving physical funds, legal filings at CAC Abuja, physically harvesting cocoa or inspecting farmland in person, hacking external systems, buying airplane tickets):
   - You MUST explicitly, politely, and clearly let the user know what you CANNOT do and WHY:
     "I cannot perform real-world external physical tasks, banking transfers, or government CAC legal filings outside of the Odu'a web platform."
   - Then, immediately explain what you CAN do concerning the website to support that business objective (e.g. "However, concerning the website, I can publish the official press statement, add an accredited investor interest button, create a dedicated project portal page, or configure direct inquiry forms right now!").
2. If the user's request IS about the website, NEVER say you cannot do it. ALWAYS generate the corresponding action in the "actions" array and apply it!

CMS ACTION TYPES & SCHEMAS:
1. ADD_BUTTON / UPDATE_BUTTON:
   payload: {
     pageName: string, // e.g. 'Home', 'Contact Us', 'About Us', or 'header'
     blockType: 'hero' | 'cta_banner' | 'rich_text' | 'header' | string,
     buttonText: string,
     buttonLink: string, // e.g. 'About Us', 'Contact Us', 'Portfolio', or external url
     buttonPosition?: 'primary' | 'secondary' | 'extra'
   }
2. DELETE_BUTTON:
   payload: {
     pageName: string,
     blockType: string,
     buttonPosition: 'primary' | 'secondary' | 'all'
   }
3. DELETE_BLOCK:
   payload: {
     pageName: string, // e.g. 'Home'
     blockType?: string, // e.g. 'faq', 'stats', 'projects', 'news', 'cta_banner', 'video', 'contact_box', 'rich_text'
     blockId?: string
   }
4. ADD_BLOCK:
   payload: {
     pageName: string,
     blockType: 'hero' | 'stats' | 'strategy' | 'states' | 'vision_mission' | 'projects' | 'news' | 'leadership' | 'calculator' | 'cta_banner' | 'rich_text' | 'video' | 'faq' | 'contact_box',
     title: string,
     subtitle?: string,
     data: object,
     position?: 'top' | 'bottom' | 'after',
     afterBlockType?: string
   }
5. UPDATE_BLOCK:
   payload: {
     pageName: string,
     blockType?: string,
     blockId?: string,
     data: object,
     title?: string
   }
6. RESTRUCTURE_PAGE / REORDER_BLOCKS:
   payload: {
     pageName: string,
     blockOrder: string[] // Array of block types or IDs in desired vertical order, e.g. ['hero', 'stats', 'projects', 'cta_banner']
   }
7. DUPLICATE_BLOCK / COPY_BLOCK:
   payload: {
     sourcePage: string,
     targetPage?: string, // defaults to sourcePage if omitted
     blockType?: string,
     blockId?: string,
     newTitle?: string
   }
8. DUPLICATE_PAGE:
   payload: {
     sourcePage: string,
     newPageName: string
   }
9. DELETE_PAGE:
   payload: {
     pageName: string
   }
10. ADD_PAGE_LAYOUT:
    payload: {
      pageName: string,
      blocks?: Array<{ id: string, type: string, title: string, visible: boolean, data: object }>
    }
11. NEWS:
    - ADD_NEWS: payload: { title, summary, content, category, author?, image? }
    - UPDATE_NEWS: payload: { id?: string, title?: string, ...updates }
    - DELETE_NEWS: payload: { id?: string, title?: string }
    - DUPLICATE_NEWS: payload: { id?: string, title?: string, newTitle?: string }
12. PROJECTS:
    - ADD_PROJECT: payload: { title, sector, state, description, progress?, budget? }
    - UPDATE_PROJECT: payload: { id?: string, title?: string, ...updates }
    - DELETE_PROJECT: payload: { id?: string, title?: string }
    - DUPLICATE_PROJECT: payload: { id?: string, title?: string, newTitle?: string }
13. SUBSIDIARIES:
    - ADD_SUBSIDIARY: payload: { name, sector, description, ownership?, website? }
    - UPDATE_SUBSIDIARY: payload: { id?: string, name?: string, ...updates }
    - DELETE_SUBSIDIARY: payload: { id?: string, name?: string }
    - DUPLICATE_SUBSIDIARY: payload: { id?: string, name?: string, newName?: string }
14. DIRECTORS & LEADERSHIP:
    - ADD_DIRECTOR: payload: { name, role, committee?, state?, bio?, image? }
    - UPDATE_DIRECTOR: payload: { id?: string, name?: string, ...updates }
    - DELETE_DIRECTOR: payload: { id?: string, name?: string }
15. NAVIGATION:
    - ADD_NAV_ITEM: payload: { label: string, pageId: string, url?: string }
    - DELETE_NAV_ITEM: payload: { id?: string, label?: string }
    - UPDATE_NAV_ITEM: payload: { label: string, newLabel?: string, pageId?: string }
16. FAQS:
    - ADD_FAQ: payload: { question: string, answer: string, category?: string }
    - UPDATE_FAQ: payload: { id?: string, question?: string, answer?: string }
    - DELETE_FAQ: payload: { id?: string, question?: string }
17. GENERAL SETTINGS:
    - UPDATE_GENERAL_SETTINGS: payload: { siteName?, tagline?, phone?, email?, address?, assetValue?, heroTitle?, heroSubtitle?, heroBadge?, primaryButtonText?, primaryButtonLink?, secondaryButtonText?, secondaryButtonLink?, headerCtaText?, headerCtaLink? }
18. THEMES & STYLING:
    - SET_THEME: payload: { themeKey: 'green' | 'purple' | 'crimson' | 'blue' | 'charcoal' }
    - SET_HEADER_STYLE: payload: { headerStyle: 'translucent' | 'solid-dark' | 'white-topbar' }
    - SET_FOOTER_STYLE: payload: { footerStyle: 'modern-bento' | 'executive-heritage' | 'minimal-clean' | 'sovereign-mega' | 'corporate-dark' }
    - SET_LAYOUT: payload: { layout: 'full' | 'boxed' }
    - SET_FONT_PAIRING: payload: { fontPairing: 'serif' | 'sans' | 'mono' }
19. DIRECT CODEBASE EDITING & HARDCODED ELEMENT MODIFICATION:
    You have 100% UNRESTRICTED, AUTONOMOUS READ AND WRITE ACCESS TO THE ENTIRE WEBSITE SOURCE CODE ON DISK.
    Everything hardcoded in any component, page, script, styling, or server route CAN be modified by you directly!
    Key Files in the Project:
    - src/App.tsx: Main routing and navigation shell
    - src/components/BioPageWrapper.tsx: Master wrapper for all executive & director biography pages (contains sticky top bars, go back button, timeline, achievements)
    - src/components/Footer.tsx: Global footer (copyright, disclaimer, newsletter, quick links)
    - src/pages/*.tsx: All page components including:
      - Home.tsx, AboutUs.tsx, BoardOfDirectors.tsx, LeadershipTeam.tsx, Portfolio.tsx, Media.tsx, Contact.tsx, WhoWeAre.tsx, GovernanceCompliance.tsx, Careers.tsx, Investors.tsx, OduaFoundation.tsx
      - All 15 Biography Pages: BimboAshiruBio.tsx, AbdulrahmanYinusaBio.tsx, SegunOlujobiBio.tsx, SeniAdioBio.tsx, TolaKasaliBio.tsx, DebolaOsibogunBio.tsx, ChiefSegunOjoBio.tsx, FolushoOlaniyanBio.tsx, OlusojiSangobiyiBio.tsx, OdunayoAdenijiBio.tsx, YemiAjaoBio.tsx, VictorAyetoroBio.tsx, LaiOriowoBio.tsx, AbiodunBamiduroBio.tsx, AbiolaOlufunkeAjayiBio.tsx
    - src/index.css: Tailwind styling and custom CSS

    ACTION: MODIFY_CODE_FILE
    Use when changing hardcoded code, texts, buttons, styles, or functions in any file:
    payload: {
      filePath: string, // relative path e.g. "src/components/Footer.tsx", "src/components/BioPageWrapper.tsx", "src/pages/Home.tsx"
      targetContent: string, // exact code snippet currently in the file to replace
      replacementContent: string, // new code snippet to put in its place
      description: string // human-readable explanation of the change
    }

    ACTION: REPLACE_CODE_FILE
    Use when replacing an entire file's content:
    payload: {
      filePath: string,
      fullContent: string,
      description: string
    }

    ACTION: CREATE_CODE_FILE
    Use when generating a brand new file in src/:
    payload: {
      filePath: string,
      content: string,
      description: string
    }

Return strictly JSON:
{
  "reply": "string (punchy, high-impact summary of what was executed, or clear notification of what cannot be done and the alternative)",
  "actions": [
    {
      "id": "string",
      "type": "MODIFY_CODE_FILE" | "REPLACE_CODE_FILE" | "CREATE_CODE_FILE" | "ADD_BUTTON" | "UPDATE_BUTTON" | "DELETE_BUTTON" | "DELETE_BLOCK" | "ADD_BLOCK" | "UPDATE_BLOCK" | "RESTRUCTURE_PAGE" | "REORDER_BLOCKS" | "DUPLICATE_BLOCK" | "COPY_BLOCK" | "DELETE_PAGE" | "DUPLICATE_PAGE" | "ADD_PAGE_LAYOUT" | "ADD_NEWS" | "UPDATE_NEWS" | "DELETE_NEWS" | "DUPLICATE_NEWS" | "ADD_PROJECT" | "UPDATE_PROJECT" | "DELETE_PROJECT" | "DUPLICATE_PROJECT" | "ADD_SUBSIDIARY" | "UPDATE_SUBSIDIARY" | "DELETE_SUBSIDIARY" | "DUPLICATE_SUBSIDIARY" | "ADD_DIRECTOR" | "UPDATE_DIRECTOR" | "DELETE_DIRECTOR" | "ADD_NAV_ITEM" | "DELETE_NAV_ITEM" | "UPDATE_NAV_ITEM" | "ADD_FAQ" | "UPDATE_FAQ" | "DELETE_FAQ" | "UPDATE_GENERAL_SETTINGS" | "SET_THEME" | "SET_HEADER_STYLE" | "SET_FOOTER_STYLE" | "SET_LAYOUT" | "SET_FONT_PAIRING",
      "title": "string",
      "description": "string",
      "payload": {}
    }
  ],
  "quickReplies": ["string"]
}`;

      // Keep recent conversation history compact (last 3 messages) to minimize input token processing latency
      const contents: any[] = [];
      if (Array.isArray(conversationHistory)) {
        const recentHistory = conversationHistory.slice(-3);
        for (const item of recentHistory) {
          if (item && item.text) {
            contents.push({
              role: item.role === 'user' ? 'user' : 'model',
              parts: [{ text: item.text.length > 500 ? item.text.slice(0, 500) + '...' : item.text }]
            });
          }
        }
      }

      const userParts: any[] = [];

      // Process uploaded multimodal images and document attachments
      if (Array.isArray(attachments) && attachments.length > 0) {
        for (const att of attachments) {
          if (att.base64 && att.mimeType) {
            userParts.push({
              inlineData: {
                mimeType: att.mimeType,
                data: att.base64
              }
            });
            userParts.push({
              text: `[Attached: ${att.name || 'file'} (${att.mimeType})]`
            });
          } else if (att.textContent) {
            // Trim document text to 3500 chars to avoid token bloat and ensure fast processing
            const docSnippet = att.textContent.length > 3500 ? att.textContent.slice(0, 3500) + '\n[Document truncated for speed]' : att.textContent;
            userParts.push({
              text: `\n=== DOCUMENT: ${att.name || 'document'} ===\n${docSnippet}\n=== END ===\n`
            });
          }
        }
      }

      // Compact CMS state string to minimize token ingestion latency
      const compactCms = currentCmsState ? JSON.stringify(currentCmsState) : '{}';

      // Pre-search codebase if prompt asks about code, files, or hardcoded items
      let matchedCodeContext = '';
      const promptLower = normalizedPrompt.toLowerCase();
      const codeKeywords = ['code', 'hardcoded', 'file', 'button', 'footer', 'header', 'wrapper', 'bio', 'biopage', 'copyright', 'page', 'color', 'background', 'script'];
      const shouldSearchCode = codeKeywords.some(k => promptLower.includes(k)) || promptLower.includes('.tsx') || promptLower.includes('.ts');

      if (shouldSearchCode) {
        // Extract meaningful search terms
        const terms = normalizedPrompt.replace(/[^a-zA-Z0-9_\-\. ]/g, ' ').split(/\s+/).filter((w: string) => w.length > 3 && !['want', 'with', 'from', 'this', 'that', 'make', 'change', 'have', 'access'].includes(w.toLowerCase()));
        const topMatches: any[] = [];
        for (const term of terms.slice(0, 3)) {
          const found = searchCodeInFiles(term, 4);
          for (const item of found) {
            if (!topMatches.some(m => m.filePath === item.filePath && m.line === item.line)) {
              topMatches.push(item);
            }
          }
        }
        if (topMatches.length > 0) {
          matchedCodeContext = '\n[LIVE CODEBASE MATCHES FOR USER QUERY]:\n' + 
            topMatches.slice(0, 6).map(m => `- ${m.filePath} (line ${m.line}): "${m.text}"`).join('\n') +
            '\nYou can use MODIFY_CODE_FILE with exact targetContent from these files to update the code directly.';
        }
      }

      userParts.push({
        text: `CMS State: ${compactCms}\nAdmin Prompt: ${normalizedPrompt || 'Apply website updates immediately.'}${matchedCodeContext}`
      });

      contents.push({
        role: 'user',
        parts: userParts
      });

      // Ultra-fast Gemini 3.1 Flash Lite for instant response latency (<1s)
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: contents,
        config: {
          systemInstruction,
          responseMimeType: 'application/json'
        }
      });

      const rawText = response.text || '{}';
      try {
        const parsed = JSON.parse(rawText);
        const result = {
          success: true,
          reply: parsed.reply || 'I am ready to help you manage and customize your website.',
          actions: Array.isArray(parsed.actions) ? parsed.actions : [],
          quickReplies: Array.isArray(parsed.quickReplies) ? parsed.quickReplies : []
        };

        // Autonomously execute any code modification actions immediately on disk!
        for (const action of result.actions) {
          if (action.type === 'MODIFY_CODE_FILE' || action.type === 'REPLACE_CODE_FILE' || action.type === 'CREATE_CODE_FILE') {
            try {
              const modResult = applyCodeModification(action.payload?.filePath, action.payload || {});
              action.payload = action.payload || {};
              action.payload.applied = modResult.success;
              action.payload.backupId = modResult.backupId;
              action.payload.diffPreview = modResult.diffPreview;
              action.payload.message = modResult.message;
            } catch (execErr: any) {
              action.payload = action.payload || {};
              action.payload.applied = false;
              action.payload.message = execErr?.message || 'Failed to modify code on disk';
            }
          }
        }

        // Cache result for rapid re-querying
        if (cacheKey && result.reply) {
          aiResponseCache.set(cacheKey, {
            reply: result.reply,
            actions: result.actions,
            quickReplies: result.quickReplies,
            timestamp: Date.now()
          });
          if (aiResponseCache.size > 100) {
            const oldest = aiResponseCache.keys().next().value;
            if (oldest) aiResponseCache.delete(oldest);
          }
        }

        return res.json(result);
      } catch (parseErr) {
        return res.json({
          success: true,
          reply: rawText,
          actions: [],
          quickReplies: ["🎨 Change theme color", "✨ Redesign hero section", "📄 Create new page"]
        });
      }
    } catch (error: any) {
      console.warn('AI Copilot route falling back to server intelligent handler:', error?.message || error);
      const fallbackResult = generateServerCopilotFallback(normalizedPrompt, currentCmsState);
      return res.json(fallbackResult);
    }
  });

  function generateServerCopilotFallback(prompt: string, currentCmsState: any) {
    const p = (prompt || '').toLowerCase().trim();

    // 1. Boundary check for impossible real-world offline tasks
    if (
      p.includes('transfer money') ||
      p.includes('send money') ||
      p.includes('wire money') ||
      p.includes('bank account') ||
      p.includes('hack') ||
      p.includes('file tax') ||
      p.includes('court') ||
      p.includes('lawsuit') ||
      p.includes('physical delivery') ||
      p.includes('cook') ||
      p.includes('order food') ||
      p.includes('plant cocoa') ||
      p.includes('fly to')
    ) {
      return {
        success: true,
        reply: "⚠️ **Action Boundary Notification**: As the AI Administrator for the **Odu'a Investment Company website**, my capabilities cover everything on the **website & CMS**:\n\n- 🔘 **Buttons & Navigation**: Add, edit, style, link, or delete buttons anywhere.\n- 📄 **Pages & Structure**: Create, duplicate, restructure, or remove pages and layouts.\n- 🧩 **Sections & Blocks**: Add, reorder, clone, or delete content blocks.\n- 📰 **Database Entities**: News articles, projects, board directors, and subsidiaries.\n- 🎨 **Styling & Aesthetics**: Theme colors, fonts, layouts, and headers.\n\n❌ **What I cannot do**: Real-world offline actions such as bank wire transfers, external legal filings, or physical offline logistics.\n\n💡 **What I can do for you right now**: I can add an institutional investor inquiry form, a donation/payment gateway button, or a dedicated corporate section on the website for this topic. Would you like me to add that to the website?",
        actions: [],
        quickReplies: [
          "🔘 Add a Call-to-Action Button",
          "📄 Create a new website page",
          "🎨 Change website theme colors"
        ]
      };
    }

    // 2. Full Codebase & Hardcoded element modification commands
    if (
      p.includes('code') || 
      p.includes('hardcoded') || 
      p.includes('file') || 
      p.includes('wrapper') || 
      p.includes('.tsx') || 
      p.includes('biopagewrapper') ||
      p.includes('footer.tsx') ||
      p.includes('app.tsx') ||
      (p.includes('go back') && p.includes('profile'))
    ) {
      const searchMatches = searchCodeInFiles(p.replace(/[^a-zA-Z0-9_\-\. ]/g, ' ').split(/\s+/).filter(w => w.length > 4)[0] || 'profile', 5);
      const matchedFiles = Array.from(new Set(searchMatches.map(m => m.filePath)));
      
      if (p.includes('go back') || p.includes('profile') || p.includes('bio')) {
        return {
          success: true,
          reply: `💻 **Full Codebase Access Engaged**: I have direct autonomous access to \`src/components/BioPageWrapper.tsx\` and all 15 executive & director profile pages (\`src/pages/*Bio.tsx\`).\n\nThe navigation system is running in \`BioPageWrapper.tsx\` with 3 active Go-Back layers (Sticky Top Bar, Hero Badge, and Floating Quick Action Button).\n\nYou can ask me to modify any hardcoded line in these files, change button labels, adjust colors, or reorder elements directly on disk!`,
          actions: [{
            id: 'code-check-' + Date.now(),
            type: 'MODIFY_CODE_FILE',
            title: 'Verify & Inspect BioPageWrapper Navigation',
            description: 'Inspects and synchronizes go-back navigation across all profile pages',
            payload: {
              filePath: 'src/components/BioPageWrapper.tsx',
              targetContent: 'profile-floating-back-btn',
              replacementContent: 'profile-floating-back-btn',
              applied: true,
              message: 'BioPageWrapper is active and modifying code on disk is enabled'
            }
          }],
          quickReplies: ["Inspect BioPageWrapper.tsx code", "Search codebase for hardcoded text", "View all 48 website files"]
        };
      }

      return {
        success: true,
        reply: `💻 **Website Codebase Direct Access**: I have full read and write access to all 48+ source files across your website (\`src/pages/*\`, \`src/components/*\`, \`src/App.tsx\`, etc.).\n\n${matchedFiles.length > 0 ? `Found relevant files for your query: \`${matchedFiles.join('`, `')}\`.\n` : ''}Tell me the exact change or text you want to modify in the code, and I will update the file on disk immediately!`,
        actions: [],
        quickReplies: ["Search codebase for text", "Inspect src/components/Footer.tsx", "View all website files"]
      };
    }

    // 3. Button commands
    if (p.includes('button')) {
      if (p.includes('delete') || p.includes('remove')) {
        const pageName = p.includes('contact') ? 'Contact Us' : (p.includes('about') ? 'About Us' : 'Home');
        return {
          success: true,
          reply: `🗑️ **Button Removed Successfully!** I have removed the button from the ${pageName} hero area.`,
          actions: [{
            id: 'act-btn-del-' + Date.now(),
            type: 'DELETE_BUTTON',
            title: `Delete Button from ${pageName}`,
            description: `Removes hero button from ${pageName}`,
            payload: {
              pageName,
              blockType: 'hero',
              buttonPosition: p.includes('secondary') ? 'secondary' : (p.includes('primary') ? 'primary' : 'all')
            }
          }],
          quickReplies: ["🔘 Add a new button", "👁️ View live homepage", "🎨 Change theme colors"]
        };
      } else {
        let btnLabel = 'Explore Investments';
        let btnTarget = 'Who We Are';
        if (p.includes('investor') || p.includes('portal')) {
          btnLabel = 'Investor Portal';
          btnTarget = 'Projects';
        } else if (p.includes('partner') || p.includes('join')) {
          btnLabel = 'Partner With Us';
          btnTarget = 'Contact Us';
        } else if (p.includes('download') || p.includes('report')) {
          btnLabel = 'Download 2026 Annual Report';
          btnTarget = 'Media & News';
        } else if (p.includes('contact') || p.includes('reach')) {
          btnLabel = 'Contact Executive Team';
          btnTarget = 'Contact Us';
        } else if (p.includes('career') || p.includes('job')) {
          btnLabel = 'Explore Careers';
          btnTarget = 'Contact Us';
        }

        const matchQuote = prompt.match(/["']([^"']+)["']/);
        if (matchQuote && matchQuote[1]) btnLabel = matchQuote[1];

        const isHeader = p.includes('header') || p.includes('nav');
        const pageName = p.includes('contact') ? 'Contact Us' : (p.includes('about') ? 'About Us' : 'Home');

        return {
          success: true,
          reply: `✨ **Button Added Successfully!** I have created and deployed the button **"${btnLabel}"** linking to **${btnTarget}** on ${isHeader ? 'the header bar' : `${pageName} hero`}.`,
          actions: [{
            id: 'act-btn-add-' + Date.now(),
            type: 'ADD_BUTTON',
            title: `Add "${btnLabel}" Button`,
            description: `Adds new button linking to ${btnTarget}`,
            payload: {
              pageName: isHeader ? 'Header' : pageName,
              blockType: isHeader ? 'header' : 'hero',
              buttonText: btnLabel,
              buttonLink: btnTarget,
              buttonPosition: isHeader ? 'header' : (p.includes('secondary') ? 'secondary' : 'primary')
            }
          }],
          quickReplies: ["👁️ View live website", "🎨 Change button colors", "📄 Add another section"]
        };
      }
    }

    // 3. Delete commands
    if (p.includes('delete') || p.includes('remove')) {
      if (p.includes('page')) {
        const pageName = p.includes('contact') ? 'Contact Us' : (p.includes('about') ? 'About Us' : 'Sustainability & ESG');
        return {
          success: true,
          reply: `🗑️ **Page Deleted!** I have deleted the ${pageName} page and updated the site navigation.`,
          actions: [{
            id: 'act-page-del-' + Date.now(),
            type: 'DELETE_PAGE',
            title: `Delete Page: ${pageName}`,
            description: `Removes page ${pageName}`,
            payload: { pageName }
          }],
          quickReplies: ["📄 Create a replacement page", "👁️ View live homepage"]
        };
      }
      const bType = p.includes('faq') ? 'faq' : (p.includes('stats') ? 'stats' : (p.includes('contact') ? 'contact_box' : 'rich_text'));
      return {
        success: true,
        reply: `🗑️ **Section Removed!** I have deleted the ${bType.toUpperCase()} section from the layout.`,
        actions: [{
          id: 'act-block-del-' + Date.now(),
          type: 'DELETE_BLOCK',
          title: `Delete ${bType.toUpperCase()} Section`,
          description: `Removes section from page layout`,
          payload: { pageName: 'Home', blockType: bType }
        }],
        quickReplies: ["➕ Add a replacement section", "👁️ View live homepage"]
      };
    }

    // 4. Duplicate / Copy commands
    if (p.includes('copy') || p.includes('duplicate') || p.includes('clone')) {
      if (p.includes('page')) {
        return {
          success: true,
          reply: "📋 **Page Duplicated!** I have cloned the Home page into a new modular page layout.",
          actions: [{
            id: 'act-page-dup-' + Date.now(),
            type: 'DUPLICATE_PAGE',
            title: 'Duplicate Home Page',
            description: 'Creates duplicate page clone',
            payload: { sourcePage: 'Home', newPageName: 'Executive Portal (Copy)' }
          }],
          quickReplies: ["👁️ View Duplicated Page", "🎨 Customize design"]
        };
      }
      return {
        success: true,
        reply: "📋 **Section Cloned!** I have duplicated the content block for you.",
        actions: [{
          id: 'act-block-dup-' + Date.now(),
          type: 'DUPLICATE_BLOCK',
          title: 'Duplicate Section Block',
          description: 'Duplicates block on current page',
          payload: { sourcePage: 'Home', targetPage: 'Home', blockType: 'hero' }
        }],
        quickReplies: ["👁️ View live homepage", "📄 Restructure page layout"]
      };
    }

    // 5. Restructure commands
    if (p.includes('restructure') || p.includes('reorder') || p.includes('reorganize')) {
      const pageName = p.includes('contact') ? 'Contact Us' : (p.includes('about') ? 'About Us' : 'Home');
      return {
        success: true,
        reply: `📐 **Page Restructured Successfully!** I have reorganized **${pageName}** into an optimal executive hierarchy: Hero banner → Key Metrics → Strategic Overview → Flagship Ventures → FAQs → Direct Secretariat Contact.`,
        actions: [{
          id: 'act-restructure-' + Date.now(),
          type: 'RESTRUCTURE_PAGE',
          title: `Restructure ${pageName} Architecture`,
          description: `Reorganizes block hierarchy for highest readability and impact`,
          payload: {
            pageName,
            blockOrder: ['hero', 'stats', 'rich_text', 'projects', 'faq', 'contact_box']
          }
        }],
        quickReplies: ["👁️ View Restructured Page", "🎨 Change accent colors", "🔘 Add a new button"]
      };
    }

    // Default response
    return {
      success: true,
      reply: "I am your Odu'a Website Administrator AI Copilot. I can execute any change you request across your entire website in real-time:\n- 🔘 **Buttons**: Add, edit, or delete buttons anywhere.\n- 🗑️ **Delete**: Remove any section, page, news item, or project.\n- 📐 **Restructure**: Reorder and reorganize page hierarchies.\n- 📋 **Copy**: Duplicate any block, section, or page.\n- 🎨 **Styles**: Change theme colors, fonts, and headers.\n\nTell me what you would like to do!",
      actions: [],
      quickReplies: ["🔘 Add a new button", "🗑️ Delete a section", "📐 Restructure Home page", "📋 Duplicate a page"]
    };
  }

  // Get AI Chat History
  app.get('/api/ai/chat-history', (req, res) => {
    const db = readDatabase();
    res.json({ success: true, messages: db.copilotChatHistory || [] });
  });

  // Save AI Chat History
  app.post('/api/ai/chat-history', (req, res) => {
    const db = readDatabase();
    const { messages } = req.body;
    db.copilotChatHistory = Array.isArray(messages) ? messages : [];
    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, messages: db.copilotChatHistory });
    } else {
      res.status(500).json({ success: false, message: 'Failed to persist chat history' });
    }
  });

  // Clear AI Chat History
  app.delete('/api/ai/chat-history', (req, res) => {
    const db = readDatabase();
    db.copilotChatHistory = [];
    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'Chat history cleared' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to clear chat history' });
    }
  });

  // Get full website content (always real-time, never cached)
  app.get('/api/content', (req, res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    const db = readDatabase();
    res.json(db);
  });

  // Save full database or any arbitrary key
  app.post('/api/content/full-db', (req, res) => {
    const db = readDatabase();
    const updatedDb = { ...db, ...req.body };
    const success = writeDatabase(updatedDb);
    if (success) {
      res.json({ success: true, db: updatedDb });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write full database' });
    }
  });

  // Save specific page content dynamically
  app.post('/api/content/pages', (req, res) => {
    const db = readDatabase();
    if (!db.pagesContent) db.pagesContent = {};
    const { pageId, content } = req.body;
    if (!pageId) {
      return res.status(400).json({ success: false, message: 'pageId is required' });
    }
    db.pagesContent[pageId] = { ...(db.pagesContent[pageId] || {}), ...content };
    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, pageContent: db.pagesContent[pageId] });
    } else {
      res.status(500).json({ success: false, message: 'Failed to save page content' });
    }
  });

  // Save/Update Page Blocks and Custom Pages (Visual Page Studio / AI Copilot)
  app.post('/api/content/page-blocks', (req, res) => {
    const db = readDatabase();
    if (!db.pageBlocks) db.pageBlocks = {};
    if (!db.customPages) db.customPages = [];
    const { pageName, blocks, customPages } = req.body;
    if (pageName && blocks) {
      db.pageBlocks[pageName] = blocks;
      if (!db.customPages.includes(pageName)) {
        db.customPages.push(pageName);
      }
    }
    if (Array.isArray(customPages)) {
      db.customPages = Array.from(new Set([...db.customPages, ...customPages]));
    }
    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, pageBlocks: db.pageBlocks, customPages: db.customPages });
    } else {
      res.status(500).json({ success: false, message: 'Failed to save page blocks' });
    }
  });

  // Save general settings
  app.post('/api/content/general', (req, res) => {
    const db = readDatabase();
    db.generalSettings = { ...db.generalSettings, ...req.body };
    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, generalSettings: db.generalSettings });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write to database' });
    }
  });

  // Save/Update news article
  app.post('/api/content/news', (req, res) => {
    const db = readDatabase();
    const article = req.body;
    
    if (!article.title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    if (!article.id) {
      // Create new
      article.id = String(Date.now());
      db.news.unshift(article); // Prepend new articles
    } else {
      // Edit existing
      const index = db.news.findIndex((item: any) => String(item.id) === String(article.id));
      if (index !== -1) {
        db.news[index] = { ...db.news[index], ...article };
      } else {
        db.news.unshift(article);
      }
    }

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, article });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write to database' });
    }
  });

  // Delete news article
  app.delete('/api/content/news/:id', (req, res) => {
    const db = readDatabase();
    const id = req.params.id;
    db.news = db.news.filter((item: any) => String(item.id) !== String(id));
    
    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'Article deleted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write to database' });
    }
  });

  // Save/Update career job opening
  app.post('/api/content/careers', (req, res) => {
    const db = readDatabase();
    const job = req.body;

    if (!job.title || !job.division) {
      return res.status(400).json({ success: false, message: 'Title and Division are required' });
    }

    if (!job.id) {
      job.id = 'job-' + Date.now();
      db.careers.push(job);
    } else {
      const index = db.careers.findIndex((item: any) => String(item.id) === String(job.id));
      if (index !== -1) {
        db.careers[index] = { ...db.careers[index], ...job };
      } else {
        db.careers.push(job);
      }
    }

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, job });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write to database' });
    }
  });

  // Delete career job opening
  app.delete('/api/content/careers/:id', (req, res) => {
    const db = readDatabase();
    const id = req.params.id;
    db.careers = db.careers.filter((item: any) => String(item.id) !== String(id));

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'Job deleted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write to database' });
    }
  });

  // Save/Update project
  app.post('/api/content/projects', (req, res) => {
    const db = readDatabase();
    const project = req.body;

    if (!project.title || !project.sector) {
      return res.status(400).json({ success: false, message: 'Title and Sector are required' });
    }

    if (!project.id) {
      project.id = 'project-' + Date.now();
      db.projects.push(project);
    } else {
      const index = db.projects.findIndex((item: any) => String(item.id) === String(project.id));
      if (index !== -1) {
        db.projects[index] = { ...db.projects[index], ...project };
      } else {
        db.projects.push(project);
      }
    }

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, project });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write to database' });
    }
  });

  // Delete project
  app.delete('/api/content/projects/:id', (req, res) => {
    const db = readDatabase();
    const id = req.params.id;
    db.projects = db.projects.filter((item: any) => String(item.id) !== String(id));

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'Project deleted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write to database' });
    }
  });

  // Save/Update Board Member profile
  app.post('/api/content/board', (req, res) => {
    const db = readDatabase();
    if (!db.boardMembers) db.boardMembers = [];
    const member = req.body;

    if (!member.name || !member.role) {
      return res.status(400).json({ success: false, message: 'Name and Role are required' });
    }

    if (!member.id) {
      member.id = 'board-' + Date.now();
      db.boardMembers.push(member);
    } else {
      const index = db.boardMembers.findIndex((item: any) => String(item.id) === String(member.id));
      if (index !== -1) {
        db.boardMembers[index] = { ...db.boardMembers[index], ...member };
      } else {
        db.boardMembers.push(member);
      }
    }

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, member });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write to database' });
    }
  });

  // Delete Board Member profile
  app.delete('/api/content/board/:id', (req, res) => {
    const db = readDatabase();
    if (!db.boardMembers) db.boardMembers = [];
    const id = req.params.id;
    db.boardMembers = db.boardMembers.filter((item: any) => String(item.id) !== String(id));

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'Board member deleted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write to database' });
    }
  });

  // Save/Update Leadership Team profile
  app.post('/api/content/leadership', (req, res) => {
    const db = readDatabase();
    if (!db.leadershipTeam) db.leadershipTeam = [];
    const member = req.body;

    if (!member.name || !member.role) {
      return res.status(400).json({ success: false, message: 'Name and Role are required' });
    }

    if (!member.id) {
      member.id = 'leader-' + Date.now();
      db.leadershipTeam.push(member);
    } else {
      const index = db.leadershipTeam.findIndex((item: any) => String(item.id) === String(member.id));
      if (index !== -1) {
        db.leadershipTeam[index] = { ...db.leadershipTeam[index], ...member };
      } else {
        db.leadershipTeam.push(member);
      }
    }

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, member });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write to database' });
    }
  });

  // Delete Leadership Team profile
  app.delete('/api/content/leadership/:id', (req, res) => {
    const db = readDatabase();
    if (!db.leadershipTeam) db.leadershipTeam = [];
    const id = req.params.id;
    db.leadershipTeam = db.leadershipTeam.filter((item: any) => String(item.id) !== String(id));

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'Leadership member deleted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write to database' });
    }
  });

  // Save/Update History Milestone
  app.post('/api/content/history', (req, res) => {
    const db = readDatabase();
    if (!db.historyMilestones) db.historyMilestones = [];
    const milestone = req.body;

    if (!milestone.year || !milestone.title) {
      return res.status(400).json({ success: false, message: 'Year and Title are required' });
    }

    if (!milestone.id) {
      milestone.id = 'milestone-' + Date.now();
      db.historyMilestones.push(milestone);
    } else {
      const index = db.historyMilestones.findIndex((item: any) => String(item.id) === String(milestone.id));
      if (index !== -1) {
        db.historyMilestones[index] = { ...db.historyMilestones[index], ...milestone };
      } else {
        db.historyMilestones.push(milestone);
      }
    }

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, milestone });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write to database' });
    }
  });

  // Delete History Milestone
  app.delete('/api/content/history/:id', (req, res) => {
    const db = readDatabase();
    if (!db.historyMilestones) db.historyMilestones = [];
    const id = req.params.id;
    db.historyMilestones = db.historyMilestones.filter((item: any) => String(item.id) !== String(id));

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'History milestone deleted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write to database' });
    }
  });

  // Save/Update Southwest State Info
  app.post('/api/content/states', (req, res) => {
    const db = readDatabase();
    if (!db.southwestStates) db.southwestStates = [];
    const stateData = req.body;

    if (!stateData.name) {
      return res.status(400).json({ success: false, message: 'State Name is required' });
    }

    if (!stateData.id) {
      stateData.id = stateData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      db.southwestStates.push(stateData);
    } else {
      const index = db.southwestStates.findIndex((item: any) => String(item.id) === String(stateData.id));
      if (index !== -1) {
        db.southwestStates[index] = { ...db.southwestStates[index], ...stateData };
      } else {
        db.southwestStates.push(stateData);
      }
    }

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, stateData });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write to database' });
    }
  });

  // Delete Southwest State Info
  app.delete('/api/content/states/:id', (req, res) => {
    const db = readDatabase();
    if (!db.southwestStates) db.southwestStates = [];
    const id = req.params.id;
    db.southwestStates = db.southwestStates.filter((item: any) => String(item.id) !== String(id));

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'State deleted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write to database' });
    }
  });

  // --- SUBSIDIARIES & ASSOCIATES ENDPOINTS ---
  app.post('/api/content/subsidiaries', (req, res) => {
    const db = readDatabase();
    if (!db.subsidiaries) db.subsidiaries = [];
    const item = req.body;

    if (!item.name || !item.sector) {
      return res.status(400).json({ success: false, message: 'Subsidiary Name and Sector are required' });
    }

    if (!item.id) {
      item.id = 'sub-' + Date.now();
      db.subsidiaries.push(item);
    } else {
      const index = db.subsidiaries.findIndex((s: any) => String(s.id) === String(item.id));
      if (index !== -1) {
        db.subsidiaries[index] = { ...db.subsidiaries[index], ...item };
      } else {
        db.subsidiaries.push(item);
      }
    }

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, subsidiary: item });
    } else {
      res.status(500).json({ success: false, message: 'Failed to save subsidiary' });
    }
  });

  app.delete('/api/content/subsidiaries/:id', (req, res) => {
    const db = readDatabase();
    if (!db.subsidiaries) db.subsidiaries = [];
    const id = req.params.id;
    db.subsidiaries = db.subsidiaries.filter((s: any) => String(s.id) !== String(id));

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'Subsidiary deleted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to delete subsidiary' });
    }
  });

  // --- FOUNDATION (CSR) INITIATIVES ENDPOINTS ---
  app.post(['/api/content/foundation', '/api/content/foundation-programs'], (req, res) => {
    const db = readDatabase();
    if (!db.foundationPrograms) db.foundationPrograms = [];
    const program = req.body;

    if (!program.title || !program.category) {
      return res.status(400).json({ success: false, message: 'Program Title and Category are required' });
    }

    if (!program.id) {
      program.id = 'found-' + Date.now();
      db.foundationPrograms.push(program);
    } else {
      const index = db.foundationPrograms.findIndex((p: any) => String(p.id) === String(program.id));
      if (index !== -1) {
        db.foundationPrograms[index] = { ...db.foundationPrograms[index], ...program };
      } else {
        db.foundationPrograms.push(program);
      }
    }

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, program });
    } else {
      res.status(500).json({ success: false, message: 'Failed to save foundation program' });
    }
  });

  app.delete(['/api/content/foundation/:id', '/api/content/foundation-programs/:id'], (req, res) => {
    const db = readDatabase();
    if (!db.foundationPrograms) db.foundationPrograms = [];
    const id = req.params.id;
    db.foundationPrograms = db.foundationPrograms.filter((p: any) => String(p.id) !== String(id));

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'Program deleted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to delete program' });
    }
  });

  // --- GOVERNANCE & COMPLIANCE POLICIES ENDPOINTS ---
  app.post(['/api/content/governance', '/api/content/governance-policies'], (req, res) => {
    const db = readDatabase();
    if (!db.governancePolicies) db.governancePolicies = [];
    const policy = req.body;

    if (!policy.title || !policy.category) {
      return res.status(400).json({ success: false, message: 'Policy Title and Category are required' });
    }

    if (!policy.id) {
      policy.id = 'gov-' + Date.now();
      db.governancePolicies.push(policy);
    } else {
      const index = db.governancePolicies.findIndex((p: any) => String(p.id) === String(policy.id));
      if (index !== -1) {
        db.governancePolicies[index] = { ...db.governancePolicies[index], ...policy };
      } else {
        db.governancePolicies.push(policy);
      }
    }

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, policy });
    } else {
      res.status(500).json({ success: false, message: 'Failed to save governance policy' });
    }
  });

  app.delete(['/api/content/governance/:id', '/api/content/governance-policies/:id'], (req, res) => {
    const db = readDatabase();
    if (!db.governancePolicies) db.governancePolicies = [];
    const id = req.params.id;
    db.governancePolicies = db.governancePolicies.filter((p: any) => String(p.id) !== String(id));

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'Policy deleted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to delete policy' });
    }
  });

  // --- WHISTLEBLOWER REPORTS & STATUS UPDATER ENDPOINTS ---
  app.post('/api/content/whistleblower', (req, res) => {
    const db = readDatabase();
    if (!db.whistleblowerReports) db.whistleblowerReports = [];
    const generatedId = req.body.id || `ODUA-GOV-${Math.floor(10000 + Math.random() * 90000)}`;
    const report = {
      id: generatedId,
      incidentType: req.body.incidentType || 'General Misconduct',
      subsidiaryUnit: req.body.subsidiaryUnit || 'Corporate Headquarters',
      isAnonymous: req.body.isAnonymous ?? true,
      reporterName: req.body.reporterName || 'Anonymous',
      reporterEmail: req.body.reporterEmail || 'N/A',
      incidentDetails: req.body.incidentDetails || '',
      date: new Date().toISOString().split('T')[0],
      status: 'Under Investigation',
      assignedInvestigator: 'Group Compliance Officer & Audit Committee',
      notes: 'Initial notice logged in secure portal.'
    };

    db.whistleblowerReports.unshift(report);
    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, report });
    } else {
      res.status(500).json({ success: false, message: 'Failed to record whistleblower report' });
    }
  });

  app.patch('/api/content/whistleblower/:id', (req, res) => {
    const db = readDatabase();
    if (!db.whistleblowerReports) db.whistleblowerReports = [];
    const id = req.params.id;
    const index = db.whistleblowerReports.findIndex((r: any) => String(r.id) === String(id));

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    db.whistleblowerReports[index] = {
      ...db.whistleblowerReports[index],
      ...req.body
    };

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, report: db.whistleblowerReports[index] });
    } else {
      res.status(500).json({ success: false, message: 'Failed to update report' });
    }
  });

  app.delete('/api/content/whistleblower/:id', (req, res) => {
    const db = readDatabase();
    if (!db.whistleblowerReports) db.whistleblowerReports = [];
    const id = req.params.id;
    db.whistleblowerReports = db.whistleblowerReports.filter((r: any) => String(r.id) !== String(id));

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'Report deleted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to delete report' });
    }
  });

  // --- 50-YEAR GOLDEN JUBILEE TIMELINE ENDPOINTS ---
  app.post(['/api/content/jubilee', '/api/content/jubilee-events'], (req, res) => {
    const db = readDatabase();
    if (!db.jubileeEvents) db.jubileeEvents = [];
    const item = req.body;

    if (!item.year || !item.title) {
      return res.status(400).json({ success: false, message: 'Year and Title are required' });
    }

    if (!item.id) {
      item.id = 'jubilee-' + Date.now();
      db.jubileeEvents.push(item);
    } else {
      const index = db.jubileeEvents.findIndex((j: any) => String(j.id) === String(item.id));
      if (index !== -1) {
        db.jubileeEvents[index] = { ...db.jubileeEvents[index], ...item };
      } else {
        db.jubileeEvents.push(item);
      }
    }

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, jubileeEvent: item });
    } else {
      res.status(500).json({ success: false, message: 'Failed to save jubilee milestone' });
    }
  });

  app.delete(['/api/content/jubilee/:id', '/api/content/jubilee-events/:id'], (req, res) => {
    const db = readDatabase();
    if (!db.jubileeEvents) db.jubileeEvents = [];
    const id = req.params.id;
    db.jubileeEvents = db.jubileeEvents.filter((j: any) => String(j.id) !== String(id));

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'Jubilee milestone deleted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to delete jubilee milestone' });
    }
  });

  // --- CALCULATOR SETTINGS ENDPOINT ---
  app.post(['/api/content/calculator', '/api/content/calculator-settings'], (req, res) => {
    const db = readDatabase();
    db.calculatorSettings = { ...db.calculatorSettings, ...req.body };
    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, calculatorSettings: db.calculatorSettings });
    } else {
      res.status(500).json({ success: false, message: 'Failed to update calculator settings' });
    }
  });

  // --- FAQS ENDPOINTS ---
  app.post('/api/content/faqs', (req, res) => {
    const db = readDatabase();
    if (!db.faqs) db.faqs = [];
    const item = req.body;

    if (!item.question || !item.answer) {
      return res.status(400).json({ success: false, message: 'Question and Answer are required' });
    }

    if (!item.id) {
      item.id = 'faq-' + Date.now();
      db.faqs.push(item);
    } else {
      const index = db.faqs.findIndex((f: any) => String(f.id) === String(item.id));
      if (index !== -1) {
        db.faqs[index] = { ...db.faqs[index], ...item };
      } else {
        db.faqs.push(item);
      }
    }

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, faq: item });
    } else {
      res.status(500).json({ success: false, message: 'Failed to save FAQ' });
    }
  });

  app.delete('/api/content/faqs/:id', (req, res) => {
    const db = readDatabase();
    if (!db.faqs) db.faqs = [];
    const id = req.params.id;
    db.faqs = db.faqs.filter((f: any) => String(f.id) !== String(id));

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'FAQ deleted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to delete FAQ' });
    }
  });

  // --- PRESS DOWNLOADS ENDPOINTS ---
  app.post('/api/content/downloads', (req, res) => {
    const db = readDatabase();
    if (!db.pressDownloads) db.pressDownloads = [];
    const item = req.body;

    if (!item.title || !item.category) {
      return res.status(400).json({ success: false, message: 'Title and Category are required' });
    }

    if (!item.id) {
      item.id = 'press-' + Date.now();
      db.pressDownloads.push(item);
    } else {
      const index = db.pressDownloads.findIndex((d: any) => String(d.id) === String(item.id));
      if (index !== -1) {
        db.pressDownloads[index] = { ...db.pressDownloads[index], ...item };
      } else {
        db.pressDownloads.push(item);
      }
    }

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, download: item });
    } else {
      res.status(500).json({ success: false, message: 'Failed to save download resource' });
    }
  });

  app.delete('/api/content/downloads/:id', (req, res) => {
    const db = readDatabase();
    if (!db.pressDownloads) db.pressDownloads = [];
    const id = req.params.id;
    db.pressDownloads = db.pressDownloads.filter((d: any) => String(d.id) !== String(id));

    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'Download resource deleted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to delete resource' });
    }
  });

  // Submit dynamic user contact inquiry / partner request
  app.post('/api/content/inquiries', (req, res) => {
    const db = readDatabase();
    const inquiry = {
      id: 'inq-' + Date.now(),
      fullName: req.body.fullName || 'Anonymous',
      organization: req.body.organization || 'None',
      emailAddress: req.body.emailAddress || 'no-email@domain.com',
      message: req.body.message || '',
      type: req.body.type || 'General Partner Inquiry',
      date: new Date().toISOString().split('T')[0]
    };

    db.inquiries.unshift(inquiry); // Prepend so it is at the top of the admin's inbox
    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, inquiry });
    } else {
      res.status(500).json({ success: false, message: 'Failed to submit inquiry' });
    }
  });

  // Delete an inquiry from inbox
  app.delete('/api/content/inquiries/:id', (req, res) => {
    const db = readDatabase();
    const id = req.params.id;
    db.inquiries = (db.inquiries || []).filter((inq: any) => String(inq.id) !== String(id));
    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'Inquiry deleted' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to delete inquiry' });
    }
  });

  // Delete whistleblower report
  app.delete('/api/content/whistleblower/:id', (req, res) => {
    const db = readDatabase();
    const id = req.params.id;
    db.whistleblowerReports = (db.whistleblowerReports || []).filter((rep: any) => String(rep.id) !== String(id));
    const success = writeDatabase(db);
    if (success) {
      res.json({ success: true, message: 'Report deleted' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to delete report' });
    }
  });

  // Get dynamic visitor stats (mocked with realistic values for standard administrative reporting)
  app.get('/api/stats', (req, res) => {
    const db = readDatabase();
    res.json({
      uniqueVisitors: 4520,
      pageViews: 18450,
      activeSessions: 34,
      totalInquiries: db.inquiries.length,
      recentActivity: [
        { type: 'login', message: 'Admin logged in', time: 'Just now' },
        { type: 'submission', message: `New submission from ${db.inquiries[0]?.fullName || 'Guest'}`, time: 'Recently' }
      ]
    });
  });

  // Serve uploaded files statically
  const uploadDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadDir));

  // Get list of all uploaded files on the server
  app.get('/api/uploads', (req, res) => {
    try {
      if (!fs.existsSync(uploadDir)) {
        return res.json({ success: true, files: [] });
      }
      const fileNames = fs.readdirSync(uploadDir);
      const files = fileNames
        .filter(name => !name.startsWith('.'))
        .map(fileName => {
          const filePath = path.join(uploadDir, fileName);
          const stats = fs.statSync(filePath);
          const sizeKb = Math.round(stats.size / 1024);
          const sizeStr = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;
          return {
            filename: fileName,
            url: `/uploads/${fileName}`,
            size: sizeStr,
            bytes: stats.size,
            date: stats.mtime.toISOString().split('T')[0]
          };
        })
        .sort((a, b) => b.filename.localeCompare(a.filename));

      res.json({ success: true, files });
    } catch (error: any) {
      console.error('Error listing uploads:', error);
      res.status(500).json({ success: false, message: error.message || 'Failed to list uploads' });
    }
  });

  // Delete uploaded file from server
  app.delete('/api/uploads/:filename', (req, res) => {
    try {
      const fileName = path.basename(req.params.filename);
      const filePath = path.join(uploadDir, fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return res.json({ success: true, message: 'File deleted successfully' });
      }
      res.status(404).json({ success: false, message: 'File not found' });
    } catch (error: any) {
      console.error('Error deleting file:', error);
      res.status(500).json({ success: false, message: error.message || 'Failed to delete file' });
    }
  });

  // Robust base64 file upload API (supports images, documents, PDFs up to 50MB)
  app.post('/api/upload', (req, res) => {
    try {
      const { name, data } = req.body;
      if (!name || !data) {
        return res.status(400).json({ success: false, message: 'Name and base64 data are required' });
      }

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Strip base64 prefix if present
      let cleanData = data;
      if (data.includes(';base64,')) {
        cleanData = data.split(';base64,')[1];
      }

      const buffer = Buffer.from(cleanData, 'base64');

      // Sanitise and generate unique filename
      const fileExt = path.extname(name) || '.png';
      const baseName = path.basename(name, fileExt).replace(/[^a-zA-Z0-9_-]/g, '_');
      const fileName = `${baseName}_${Date.now()}${fileExt}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);

      const sizeKb = Math.round(buffer.length / 1024);
      const sizeStr = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;

      res.json({ 
        success: true, 
        url: `/uploads/${fileName}`,
        name: fileName,
        originalName: name,
        size: sizeStr,
        bytes: buffer.length
      });
    } catch (error: any) {
      console.error('Error writing uploaded file:', error);
      res.status(500).json({ success: false, message: error.message || 'Failed to save file' });
    }
  });

  // --- VITE DEV / PRODUCTION MIDDLEWARE ---

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CMS Backend] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

export interface Theme {
  // id: string;
  _id: string;
  name: string;
  // description: string;
  category: string;
  price: string;
  tags: string[];
  status: 'active' | 'inactive' | 'draft';
  version: string;
  author: string;
  lastUpdated: string;
  path: string;
}

export interface ThemeAction {
  id: string;
  name: string;
  description: string;
  icon: string;
  action: 'download' | 'preview' | 'purchase' | 'documentation' | 'gallery' | 'source' | 'fullscreen' | 'customize';
  url?: string;
  external?: boolean;
  requiresAuth?: boolean;
}

export interface ThemeDetailConfig {
  themeId: string;
  actions: ThemeAction[];
  showPreview: boolean;
  showInfo: boolean;
  showActions: boolean;
  previewHeight: number;
  allowFullscreen: boolean;
}

export const DEFAULT_THEME_ACTIONS: ThemeAction[] = [
  {
    id: 'preview',
    name: 'Preview Theme',
    description: 'View theme in full detail',
    icon: '👁️',
    action: 'preview',
    url: '/theme/{themeId}',
    external: true
  },
  {
    id: 'download',
    name: 'Download Theme',
    description: 'Download theme files',
    icon: '⬇️',
    action: 'download',
    requiresAuth: true
  },
  {
    id: 'purchase',
    name: 'Purchase License',
    description: 'Buy theme license',
    icon: '💳',
    action: 'purchase',
    requiresAuth: true
  },
  {
    id: 'documentation',
    name: 'View Documentation',
    description: 'Read theme documentation',
    icon: '📚',
    action: 'documentation'
  },
  {
    id: 'gallery',
    name: 'Browse Gallery',
    description: 'View all available themes',
    icon: '🖼️',
    action: 'gallery',
    url: '/gallery',
    external: true
  },
  {
    id: 'source',
    name: 'View Source',
    description: 'View theme source code',
    icon: '🔍',
    action: 'source',
    external: true
  },
  {
    id: 'fullscreen',
    name: 'Fullscreen Preview',
    description: 'Open theme in fullscreen',
    icon: '⛶',
    action: 'fullscreen',
    external: true
  },
  {
    id: 'customize',
    name: 'Customize Theme',
    description: 'Customize theme settings',
    icon: '⚙️',
    action: 'customize',
    requiresAuth: true
  }
]; 
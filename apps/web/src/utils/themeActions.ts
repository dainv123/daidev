import { ThemeAction, Theme } from '../types/theme';

export class ThemeActionHandler {
  private themeDetailBaseUrl = 'http://localhost:3004';
  private webAppBaseUrl = 'http://localhost:3003';

  constructor(private theme: Theme) {}

  /**
   * Execute a theme action
   */
  executeAction(action: ThemeAction): void {
    switch (action.action) {
      case 'preview':
        this.openThemePreview();
        break;
      case 'download':
        this.downloadTheme();
        break;
      case 'purchase':
        this.purchaseTheme();
        break;
      case 'documentation':
        this.viewDocumentation();
        break;
      case 'gallery':
        this.openGallery();
        break;
      case 'source':
        this.viewSource();
        break;
      case 'fullscreen':
        this.openFullscreen();
        break;
      case 'customize':
        this.customizeTheme();
        break;
      default:
        console.warn(`Unknown action: ${action.action}`);
    }
  }

  /**
   * Open theme preview in theme-detail app
   */
  private openThemePreview(): void {
    const url = `${this.themeDetailBaseUrl}/theme/${this.theme.name}`;
    window.open(url, '_blank');
  }

  /**
   * Download theme files
   */
  private downloadTheme(): void {
    // In real app, this would call API to generate download link
    const downloadUrl = `${this.themeDetailBaseUrl}/api/themes/${this.theme._id}/download`;
    
    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${this.theme._id}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Purchase theme license
   */
  private purchaseTheme(): void {
    // In real app, this would redirect to payment page
    const purchaseUrl = `${this.webAppBaseUrl}/purchase?theme=${this.theme._id}`;
    window.open(purchaseUrl, '_blank');
  }

  /**
   * View theme documentation
   */
  private viewDocumentation(): void {
    const docUrl = `${this.themeDetailBaseUrl}/docs/${this.theme._id}`;
    window.open(docUrl, '_blank');
  }

  /**
   * Open theme gallery
   */
  private openGallery(): void {
    const galleryUrl = `${this.themeDetailBaseUrl}/gallery`;
    window.open(galleryUrl, '_blank');
  }

  /**
   * View theme source code
   */
  private viewSource(): void {
    const sourceUrl = `${this.themeDetailBaseUrl}/theme/${this.theme.name}`;
    window.open(sourceUrl, '_blank');
  }

  /**
   * Open theme in fullscreen
   */
  private openFullscreen(): void {
    const fullscreenUrl = `${this.themeDetailBaseUrl}/theme/${this.theme.name}`;
    window.open(fullscreenUrl, '_blank', 'fullscreen=yes');
  }

  /**
   * Customize theme settings
   */
  private customizeTheme(): void {
    const customizeUrl = `${this.webAppBaseUrl}/customize?theme=${this.theme._id}`;
    window.open(customizeUrl, '_blank');
  }

  /**
   * Get available actions for current theme
   */
  getAvailableActions(): ThemeAction[] {
    const baseActions = [
      {
        id: 'preview',
        name: 'Preview Theme',
        description: 'View theme in full detail',
        icon: '👁️',
        action: 'preview' as const,
        external: true
      },
      // {
      //   id: 'gallery',
      //   name: 'Browse Gallery',
      //   description: 'View all available themes',
      //   icon: '🖼️',
      //   action: 'gallery' as const,
      //   external: true
      // },
      // {
      //   id: 'source',
      //   name: 'View Source',
      //   description: 'View theme source code',
      //   icon: '🔍',
      //   action: 'source' as const,
      //   external: true
      // },
      {
        id: 'fullscreen',
        name: 'Fullscreen Preview',
        description: 'Open theme in fullscreen',
        icon: '⛶',
        action: 'fullscreen' as const,
        external: true
      }
    ];

    // Add authenticated actions if user is logged in
    // In real app, check authentication status
    const authenticatedActions = [
      {
        id: 'download',
        name: 'Download Theme',
        description: 'Download theme files',
        icon: '⬇️',
        action: 'download' as const,
        requiresAuth: true
      },
      {
        id: 'purchase',
        name: 'Purchase License',
        description: 'Buy theme license',
        icon: '💳',
        action: 'purchase' as const,
        requiresAuth: true
      },
      {
        id: 'customize',
        name: 'Customize Theme',
        description: 'Customize theme settings',
        icon: '⚙️',
        action: 'customize' as const,
        requiresAuth: true
      }
    ];

    return [...baseActions, ...authenticatedActions];
  }
} 
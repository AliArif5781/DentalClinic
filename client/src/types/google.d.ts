interface GoogleAccounts {
  id: {
    initialize: (config: {
      client_id: string;
      callback: (response: { credential: string }) => void;
      auto_select?: boolean;
    }) => void;
    renderButton: (
      parent: HTMLElement,
      options: {
        theme?: 'outline' | 'filled_blue' | 'filled_black';
        size?: 'large' | 'medium' | 'small';
        type?: 'standard' | 'icon';
        text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
        shape?: 'rectangular' | 'pill' | 'circle' | 'square';
        logo_alignment?: 'left' | 'center';
        width?: number;
        locale?: string;
      }
    ) => void;
    prompt: () => void;
  };
}

interface Window {
  google?: {
    accounts: GoogleAccounts;
  };
}

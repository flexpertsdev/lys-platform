import { User, UserRole, LoginCredentials, RegisterData, Invitation } from '../types';

// Mock authentication service that mirrors Firebase Auth API
class AuthService {
  private currentUser: User | null = null;
  private mockUsers: Map<string, { user: User; password: string }> = new Map();
  private mockInvitations: Map<string, Invitation> = new Map();

  constructor() {
    // Initialize with mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    // Create demo users
    const demoRetailer: User = {
      id: '1',
      email: 'retailer@demo.com',
      displayName: 'Demo Retailer',
      role: UserRole.RETAILER,
      companyName: 'Beauty Boutique Ltd',
      phoneNumber: '+44 20 1234 5678',
      emailVerified: true,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      preferences: {
        language: 'en',
        currency: 'GBP',
        notifications: {
          email: true,
          orderUpdates: true,
          newProducts: true,
          promotions: false
        }
      }
    };

    const demoBrand: User = {
      id: '2',
      email: 'brand@demo.com',
      displayName: 'Demo Brand Rep',
      role: UserRole.BRAND_REP,
      companyName: 'K-Beauty Innovations',
      phoneNumber: '+82 2 1234 5678',
      emailVerified: true,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      preferences: {
        language: 'ko',
        currency: 'USD',
        notifications: {
          email: true,
          orderUpdates: true,
          newProducts: false,
          promotions: true
        }
      }
    };

    const demoAdmin: User = {
      id: '3',
      email: 'admin@lys.com',
      displayName: 'LYS Admin',
      role: UserRole.ADMIN,
      companyName: 'Loving Your Skin',
      emailVerified: true,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      preferences: {
        language: 'en',
        currency: 'GBP',
        notifications: {
          email: true,
          orderUpdates: true,
          newProducts: true,
          promotions: true
        }
      }
    };

    // Store users with passwords
    this.mockUsers.set(demoRetailer.email, { user: demoRetailer, password: 'demo123' });
    this.mockUsers.set(demoBrand.email, { user: demoBrand, password: 'demo123' });
    this.mockUsers.set(demoAdmin.email, { user: demoAdmin, password: 'admin123' });

    // Create a demo invitation
    const demoInvitation: Invitation = {
      id: 'inv-1',
      email: 'newretailer@example.com',
      role: UserRole.RETAILER,
      token: 'demo-invitation-token',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      createdBy: demoAdmin.id,
      createdAt: new Date(),
      status: 'pending'
    };

    this.mockInvitations.set(demoInvitation.token, demoInvitation);
  }

  // Authentication methods
  async signIn({ email, password }: LoginCredentials): Promise<User> {
    const userData = this.mockUsers.get(email);
    
    if (!userData || userData.password !== password) {
      throw new Error('Invalid email or password');
    }

    this.currentUser = { ...userData.user, lastLogin: new Date() };
    this.persistUser(this.currentUser);
    
    return this.currentUser;
  }

  async signUp(data: RegisterData): Promise<User> {
    // Check if invitation is valid
    if (data.invitationToken) {
      const invitation = this.mockInvitations.get(data.invitationToken);
      if (!invitation || invitation.email !== data.email) {
        throw new Error('Invalid invitation token');
      }
      if (invitation.status !== 'pending') {
        throw new Error('Invitation has already been used');
      }
      if (invitation.expiresAt < new Date()) {
        throw new Error('Invitation has expired');
      }
    }

    // Check if user already exists
    if (this.mockUsers.has(data.email)) {
      throw new Error('User already exists');
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      displayName: data.displayName,
      role: data.role,
      companyName: data.companyName,
      emailVerified: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      preferences: {
        language: 'en',
        currency: 'USD',
        notifications: {
          email: true,
          orderUpdates: true,
          newProducts: true,
          promotions: false
        }
      }
    };

    this.mockUsers.set(data.email, { user: newUser, password: data.password });
    
    // Mark invitation as accepted
    if (data.invitationToken) {
      const invitation = this.mockInvitations.get(data.invitationToken)!;
      invitation.status = 'accepted';
      invitation.acceptedAt = new Date();
    }

    this.currentUser = newUser;
    this.persistUser(this.currentUser);
    
    return newUser;
  }

  async signOut(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('lys-user');
    localStorage.removeItem('lys-auth-token');
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser;
    }

    // Try to restore from localStorage
    const storedUser = localStorage.getItem('lys-user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      return this.currentUser;
    }

    return null;
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }

    const updatedUser = {
      ...this.currentUser,
      ...updates,
      updatedAt: new Date()
    };

    const userData = this.mockUsers.get(this.currentUser.email);
    if (userData) {
      userData.user = updatedUser;
    }

    this.currentUser = updatedUser;
    this.persistUser(this.currentUser);
    
    return updatedUser;
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    const userData = this.mockUsers.get(email);
    if (!userData) {
      // Don't reveal if user exists
      return;
    }

    // In production, this would send an actual email
    console.log(`Password reset email sent to ${email}`);
  }

  async verifyEmail(): Promise<void> {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }

    this.currentUser.emailVerified = true;
    await this.updateProfile({ emailVerified: true });
  }

  // Invitation management
  async validateInvitation(token: string): Promise<Invitation | null> {
    const invitation = this.mockInvitations.get(token);
    
    if (!invitation) {
      return null;
    }

    if (invitation.status !== 'pending') {
      throw new Error('Invitation has already been used');
    }

    if (invitation.expiresAt < new Date()) {
      throw new Error('Invitation has expired');
    }

    return invitation;
  }

  async createInvitation(email: string, role: UserRole): Promise<Invitation> {
    if (!this.currentUser || this.currentUser.role !== UserRole.ADMIN) {
      throw new Error('Only admins can create invitations');
    }

    const invitation: Invitation = {
      id: `inv-${Date.now()}`,
      email,
      role,
      token: `token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      createdBy: this.currentUser.id,
      createdAt: new Date(),
      status: 'pending'
    };

    this.mockInvitations.set(invitation.token, invitation);
    
    // In production, this would send an email
    console.log(`Invitation sent to ${email} with token: ${invitation.token}`);
    
    return invitation;
  }

  // Helper methods
  private persistUser(user: User): void {
    localStorage.setItem('lys-user', JSON.stringify(user));
    // In production, we'd store a JWT token
    localStorage.setItem('lys-auth-token', `mock-token-${user.id}`);
  }

  // Firebase-ready methods (will be implemented when switching to Firebase)
  async onAuthStateChanged(callback: (user: User | null) => void): Promise<() => void> {
    // Simulate Firebase's auth state listener
    callback(this.currentUser);
    
    // Return unsubscribe function
    return () => {
      // Cleanup
    };
  }

  // Method to simulate token refresh
  async refreshToken(): Promise<string> {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }
    
    return `refreshed-mock-token-${this.currentUser.id}-${Date.now()}`;
  }
}

// Export singleton instance
export const authService = new AuthService();
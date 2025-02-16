import type { LucideIcon } from 'lucide-react';

export interface SubItem {
  id: string;
  label: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  subItems?: SubItem[];
}

export interface UserMenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar?: string;
  role: string;
}

// Suppress Next.js page warning by exporting a dummy component
export default function DummyComponent() {
  return null;
}
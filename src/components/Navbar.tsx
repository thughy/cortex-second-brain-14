
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, LogIn, Search, Upload, User, Settings, LogOut, Moon, Sun, Table, Info, HelpCircle, Code } from 'lucide-react';
import { useRippleEffect } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import AuthModal from '@/components/AuthModal';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  hasSubmenu?: boolean;
  children?: React.ReactNode;
}

const NavItem = ({ to, icon, label, active, onClick, hasSubmenu, children }: NavItemProps) => {
  const handleRipple = useRippleEffect();
  const [isHovered, setIsHovered] = useState(false);
  
  if (hasSubmenu) {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                "hover:bg-primary/10 hover:text-primary", 
                active ? "bg-primary/10 text-primary" : "text-foreground/80"
              )}
            >
              <span className={cn(
                "transition-all duration-300",
                active ? "text-primary" : "text-foreground/60"
              )}>
                {icon}
              </span>
              <span className="font-medium">{label}</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[200px] gap-1 p-2">
                {children}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }
  
  return (
    <Link 
      to={to} 
      className={cn(
        "relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
        "hover:bg-primary/10 hover:text-primary",
        "overflow-hidden",
        active ? "bg-primary/10 text-primary" : "text-foreground/80"
      )}
      onClick={(e) => {
        handleRipple(e);
        onClick();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={cn(
        "transition-all duration-300",
        active ? "text-primary" : "text-foreground/60"
      )}>
        {icon}
      </span>
      {(active || isHovered) && (
        <span className="font-medium transition-all duration-300">{label}</span>
      )}
      {active && (
        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary transform origin-left"></span>
      )}
    </Link>
  );
};

const SubMenuItem = ({ to, icon, label, active, onClick }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-2 p-2 rounded-md hover:bg-primary/10 hover:text-primary transition-all duration-300",
        active ? "bg-primary/10 text-primary" : ""
      )}
      onClick={onClick}
    >
      <span className={cn(
        "transition-all duration-300",
        active ? "text-primary" : "text-foreground/60"
      )}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
};

export const Navbar = () => {
  const [active, setActive] = useState('what');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleNavItemClick = (id: string) => {
    setActive(id);
  };

  const cortexSubmenu = [
    { to: '/', icon: <Info size={18} />, label: 'What', id: 'what' },
    { to: '/why', icon: <HelpCircle size={18} />, label: 'Why', id: 'why' },
    { to: '/how', icon: <Code size={18} />, label: 'How', id: 'how' },
  ];
  
  const authNavItems = [
    { to: '/manage', icon: <Table size={20} />, label: 'Manage', id: 'manage' },
    { to: '/search', icon: <Search size={20} />, label: 'Search', id: 'search' },
    { to: '/import', icon: <Upload size={20} />, label: 'Import', id: 'import' },
    { to: '/profile', icon: <User size={20} />, label: 'Profile', id: 'profile' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings', id: 'settings' },
  ];

  const navItems = isAuthenticated ? authNavItems : [];

  return (
    <>
      <header className="glass-panel fixed top-6 left-1/2 transform -translate-x-1/2 z-40 rounded-lg px-1 py-1">
        <nav className="flex items-center">
          {/* Cortex with submenu */}
          <NavItem
            to="#"
            icon={<Brain size={20} />}
            label="Cortex"
            active={['what', 'why', 'how'].includes(active)}
            onClick={() => {}}
            hasSubmenu={true}
          >
            {cortexSubmenu.map((item) => (
              <SubMenuItem
                key={item.id}
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={active === item.id}
                onClick={() => handleNavItemClick(item.id)}
              />
            ))}
          </NavItem>
          
          {/* Other nav items */}
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={active === item.id}
              onClick={() => handleNavItemClick(item.id)}
            />
          ))}
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full ml-1"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle {theme === 'dark' ? 'light' : 'dark'} mode</p>
            </TooltipContent>
          </Tooltip>
          
          {isAuthenticated ? (
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground"
              onClick={logout}
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground"
              onClick={handleOpenAuthModal}
            >
              <LogIn size={20} />
              <span className="font-medium">Login</span>
            </Button>
          )}
        </nav>
      </header>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
    </>
  );
};

export default Navbar;

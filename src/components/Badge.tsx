
import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
}

const Badge = ({ label, variant = 'default', className }: BadgeProps) => {
  const variantClasses = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-game-success text-white',
    warning: 'bg-game-warning text-black',
    danger: 'bg-game-error text-white'
  };

  return (
    <span 
      className={cn(
        "game-badge",
        variantClasses[variant],
        className
      )}
    >
      {label}
    </span>
  );
};

export default Badge;

import React from "react";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="space-y-2 text-center relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 text-muted-foreground hover:text-foreground transition-colors"
          onClick={toggleTheme}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <h1 className="text-4xl font-bold text-transparent bg-primary bg-clip-text">
            Todo List
        </h1>

        <p className="text-lg text-muted-foreground">
            Không có việc gì khó, chỉ sợ mình không làm.🐧 
        </p>
    </div>
    );
};  

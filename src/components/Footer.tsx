import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-2 text-gray-600">
          <div className="flex items-center space-x-2">
            <Github className="w-4 h-4" />
            <a 
              href="https://github.com/yunuseyvz/WAL_stroop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              Source Code auf GitHub
            </a>
          </div>
          <p className="text-sm text-gray-500 text-center">
            Erstellt für das Modul <span className="font-medium">Wissenschaftliches Arbeiten und Lehren</span>
            <br />
            <span className="font-medium">LMU München</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

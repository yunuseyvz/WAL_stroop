import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center text-sm text-gray-500 text-center gap-2 sm:gap-0">
          <a 
            href="https://github.com/yunuseyvz/WAL_stroop" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <Github className="w-4 h-4 mr-1" />
            Source Code
          </a>
          <span className="hidden sm:inline mx-2">•</span>
          <span>Erstellt für das Modul{' '}
            <a 
              href="https://www.medien.ifi.lmu.de/lehre/ss25/wal/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              Wissenschaftliches Arbeiten und Lehren
            </a>
            {' '}an der LMU München
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

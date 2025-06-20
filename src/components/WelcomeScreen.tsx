import { ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Willkommen zur Studie! 👋
        </h1>
        <p className="text-xl text-blue-100">
          Vielen Dank für Ihre Teilnahme an unserer Forschung
        </p>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 p-8 rounded-xl mb-8">
        <h2 className="text-2xl font-bold text-yellow-900 mb-6 text-center">
          Ziel der Studie
        </h2>
        <p className="text-yellow-800 leading-relaxed text-lg">
          Ziel dieser Untersuchung ist es, den Einfluss von sogenannten „Shortform"-Inhalten 
          (z. B. kurze Videos auf Plattformen wie TikTok, Instagram Reels oder YouTube Shorts) 
          auf die Aufmerksamkeitsspanne zu untersuchen.
        </p>
        <br />
        <p className="text-yellow-800 leading-relaxed text-lg">
          Dazu werden wir nun einen kurzen Aufmerksamkeitstest durchführen, den sogenannten 
          <strong> Stroop-Test</strong>. Dieser Test misst, wie gut Sie in der Lage sind, 
          Ihre Aufmerksamkeit zu steuern und Ablenkungen zu ignorieren.
        </p>
        <br />
        <p className="text-yellow-800 leading-relaxed text-lg">
          Der Test dauert etwa <strong>2-3 Minuten</strong>. Daten werden anonymisiert gespeichert. Im Anschluss werden Sie gebeten, 
          eine kurze Umfrage auszufüllen.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl mb-8">
        <h3 className="text-xl font-semibold text-blue-900 mb-4 text-center">
          Das erwartet Sie:
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold text-lg">1</span>
            </div>
            <h4 className="font-semibold text-blue-900 mb-2">Anweisungen</h4>
            <p className="text-blue-700 text-sm">1 Minute</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold text-lg">2</span>
            </div>
            <h4 className="font-semibold text-blue-900 mb-2">Stroop-Test</h4>
            <p className="text-blue-700 text-sm">2-3 Minuten</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold text-lg">3</span>
            </div>
            <h4 className="font-semibold text-blue-900 mb-2">Debriefing & Umfrage</h4>
            <p className="text-blue-700 text-sm">5-7 Minuten</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => {
            window.scrollTo({ top: 0 });
            onContinue();
          }}
          className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Weiter zu den Anweisungen
          <ArrowRight className="h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode, Globe, RefreshCw } from 'lucide-react';

function App() {
  const [inputText, setInputText] = useState('https://example.com');
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!inputText.trim()) {
      setError('Te rog introdu un URL sau text');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const dataURL = await QRCode.toDataURL(inputText, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1F2937',
          light: '#FFFFFF'
        }
      });
      
      setQrCodeDataURL(dataURL);
    } catch (err) {
      setError('Eroare la generarea codului QR');
      console.error('QR Code generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeDataURL) return;

    const link = document.createElement('a');
    link.href = qrCodeDataURL;
    link.download = `qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      generateQRCode();
    }
  };

  useEffect(() => {
    generateQRCode();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Generator Cod QR
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Creează rapid coduri QR pentru URL-uri, text sau orice informație.
            Generează și descarcă instant!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Globe className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Introdu datele
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label 
                  htmlFor="qr-input" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  URL sau Text
                </label>
                <input
                  id="qr-input"
                  type="text"
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="https://example.com sau orice text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">
                      !
                    </span>
                    {error}
                  </p>
                )}
              </div>

              <button
                onClick={generateQRCode}
                disabled={isGenerating || !inputText.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Se generează...</span>
                  </>
                ) : (
                  <>
                    <QrCode className="w-5 h-5" />
                    <span>Generează Cod QR</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QR Code Display Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Codul QR generat
              </h2>

              {qrCodeDataURL ? (
                <div className="space-y-6">
                  <div className="inline-block p-4 bg-gray-50 rounded-xl">
                    <img
                      src={qrCodeDataURL}
                      alt="Generated QR Code"
                      className="w-64 h-64 mx-auto"
                    />
                  </div>

                  <button
                    onClick={downloadQRCode}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 mx-auto"
                  >
                    <Download className="w-5 h-5" />
                    <span>Descarcă PNG</span>
                  </button>

                  <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
                    <p className="font-medium mb-1">Conținut cod QR:</p>
                    <p className="break-all">{inputText}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">
                      Codul QR va apărea aici
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            De ce să folosești generatorul nostru?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Rapid și Simplu</h4>
              <p className="text-gray-600">
                Generează coduri QR instant, fără înregistrare sau limitări
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Descărcare Liberă</h4>
              <p className="text-gray-600">
                Descarcă codurile QR în format PNG de înaltă calitate
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Fără Backend</h4>
              <p className="text-gray-600">
                Totul se procesează local în browser, datele tale rămân private
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>© 2025 Generator Cod QR - Simplu, Rapid, Securizat</p>
        </div>
      </div>
    </div>
  );
}

export default App;
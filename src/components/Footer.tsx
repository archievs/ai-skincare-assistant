import { Sparkles, Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import type { Section } from '../App';

interface FooterProps {
  onNavigate: (section: Section) => void;
}

const footerLinks = {
  product: [
    { label: 'AI Skin Analysis', section: 'scan' as Section },
    { label: 'Skin Quiz', section: 'quiz' as Section },
    { label: 'Products', section: 'products' as Section },
    { label: 'Progress Tracking', section: 'progress' as Section },
  ],
  company: [
    { label: 'About Us' },
    { label: 'Blog' },
    { label: 'Careers' },
    { label: 'Press' },
  ],
  support: [
    { label: 'Help Center' },
    { label: 'Contact Us' },
    { label: 'Privacy Policy' },
    { label: 'Terms of Service' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Mail, href: '#', label: 'Email' },
];

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-purple-900 to-pink-900 text-white py-16 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-white">SkinSense</span>
            </div>
            <p className="text-purple-200 mb-6 max-w-sm">
              Your AI-powered skincare companion for personalized beauty and wellness recommendations.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-white">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  {link.section ? (
                    <button
                      onClick={() => onNavigate(link.section)}
                      className="text-purple-200 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a href="#" className="text-purple-200 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-purple-200 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-white">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-purple-200 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-purple-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-purple-200">
              © 2025 SkinSense. All rights reserved.
            </p>
            <p className="text-purple-200">
              Made with 💜 for beautiful skin
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

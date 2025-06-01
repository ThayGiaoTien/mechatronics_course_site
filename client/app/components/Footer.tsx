// components/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-gray-800 text-gray-300 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-white">tailieucodientu.com</h3>
            <p className="text-sm">© {new Date().getFullYear()} Teacher Forward.</p>
          </div>
          <div className="flex space-x-6">
            <a
              href="/about"
              className="hover:text-white text-sm"
            >
              About
            </a>
            <a
              href="/privacy"
              className="hover:text-white text-sm"
            >
              Privacy
            </a>
            <a
              href="/contact"
              className="hover:text-white text-sm"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    );
  }
  
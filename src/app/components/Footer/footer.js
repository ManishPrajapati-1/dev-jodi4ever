import { Icons } from "@/app/icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-10 mt-4">
      <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto px-4">
        {/* Get In Touch Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-secondary">GET IN TOUCH</h3>
          <address className="space-y-2">
            <p>Address: 3812 Lena Lane City, Jackson, Mississippi</p>
            <p>Phone: +92 (8800) 68 - 8960</p>
            <p>
              Email: <Link href="mailto:info@example.com" className="text-appButton1 hover:text-appButton2">info@example.com</Link>
            </p>
          </address>
        </div>

        {/* Help & Support Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-secondary">HELP & SUPPORT</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="text-white hover:text-appButton1">About Company</Link></li>
            <li><Link href="#" className="text-white hover:text-appButton1">Contact Us</Link></li>
            <li><Link href="#" className="text-white hover:text-appButton1">Feedback</Link></li>
            <li><Link href="#" className="text-white hover:text-appButton1">FAQs</Link></li>
            <li><Link href="#" className="text-white hover:text-appButton1">Testimonials</Link></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-secondary">SOCIAL MEDIA</h3>
          <div className="flex space-x-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-appButton1">
              <Icons.Facebook className="h-6 w-6" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-appButton1">
              <Icons.Twitter className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-appButton1">
              <Icons.Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Company Info Section */}
      <div className="bg-tertiary py-4 text-center">
        <p className="text-sm text-gray-200">
          Jodi4Ever - Trusted by thousands of Boys & Girls for successful marriage.
        </p>
      </div>
    </footer>
  );
}

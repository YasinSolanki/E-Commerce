import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6 md:col-span-1">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600"><Mail size={20} /></div>
            <div><h3 className="font-semibold">Email</h3><p className="text-gray-600 text-sm">support@eminence.com</p></div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600"><Phone size={20} /></div>
            <div><h3 className="font-semibold">Phone</h3><p className="text-gray-600 text-sm">+1 (555) 123-4567</p></div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600"><MapPin size={20} /></div>
            <div><h3 className="font-semibold">Office</h3><p className="text-gray-600 text-sm">123 Commerce St, NY</p></div>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition" />
              <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition" />
            <textarea rows="4" placeholder="Your Message" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"></textarea>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

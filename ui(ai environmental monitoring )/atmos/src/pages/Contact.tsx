import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, MapPin, Phone } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  organization: z.string().min(1, 'Organization is required'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
  message: z.string().min(1, 'Message is required'),
  intent: z.array(z.string()).min(1, 'Select at least one intent')
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { intent: [] }
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen container mx-auto px-6 relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10">
        
        {/* Left: Join The Mission */}
        <div className="lg:w-5/12 flex flex-col">
          <h1 className="text-5xl md:text-6xl font-display font-black text-atmos-navy mb-6">
            Join the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-atmos-deep to-atmos-blue">Mission.</span>
          </h1>
          <p className="font-sans text-atmos-muted text-lg leading-relaxed mb-10">
            Whether you want to implement our planetary intelligence network, contribute sensor data, or explore partnership opportunities, our team is ready to collaborate.
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4 text-atmos-navy font-medium">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-atmos-blue"><Mail /></div>
              <span>connect@atmos-ai.org</span>
            </div>
            <div className="flex items-center gap-4 text-atmos-navy font-medium">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-atmos-blue"><Phone /></div>
              <span>+1 (555) PLANET-8</span>
            </div>
            <div className="flex items-center gap-4 text-atmos-navy font-medium">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-atmos-blue"><MapPin /></div>
              <span>Global Remote First</span>
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-atmos-fog">
            <div className="flex items-center gap-4">
               <div className="font-display font-bold text-xl text-gray-400">GreenSoftTech</div>
               <span className="text-sm font-bold text-atmos-muted uppercase tracking-wider border border-atmos-fog px-3 py-1 rounded-full">Official Hackathon Partner</span>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:w-7/12">
          <div className="glass p-8 md:p-12 shadow-[0_20px_50px_rgba(91,184,245,0.1)]">
            {isSubmitSuccessful ? (
               <div className="h-full flex flex-col items-center justify-center text-center py-20">
                 <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 text-4xl">✓</div>
                 <h2 className="text-3xl font-display font-bold text-atmos-navy mb-4">Transmission Received</h2>
                 <p className="text-atmos-muted font-sans max-w-md">Our intelligence team will review your inquiry and respond within 24 orbital hours.</p>
               </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-sm font-bold text-atmos-navy uppercase tracking-wider mb-2">Name</label>
                    <input {...register('name')} className={`w-full bg-white/50 border ${errors.name ? 'border-red-400' : 'border-atmos-fog'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-atmos-blue text-atmos-navy`} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block font-sans text-sm font-bold text-atmos-navy uppercase tracking-wider mb-2">Organization</label>
                    <input {...register('organization')} className={`w-full bg-white/50 border ${errors.organization ? 'border-red-400' : 'border-atmos-fog'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-atmos-blue text-atmos-navy`} />
                    {errors.organization && <p className="text-red-500 text-xs mt-1">{errors.organization.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-sm font-bold text-atmos-navy uppercase tracking-wider mb-2">Email</label>
                    <input type="email" {...register('email')} className={`w-full bg-white/50 border ${errors.email ? 'border-red-400' : 'border-atmos-fog'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-atmos-blue text-atmos-navy`} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block font-sans text-sm font-bold text-atmos-navy uppercase tracking-wider mb-2">Role</label>
                    <select {...register('role')} className={`w-full bg-white/50 border ${errors.role ? 'border-red-400' : 'border-atmos-fog'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-atmos-blue text-atmos-navy`}>
                      <option value="">Select Role</option>
                      <option value="researcher">Researcher</option>
                      <option value="government">Government Official</option>
                      <option value="enterprise">Enterprise Logic</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-sm font-bold text-atmos-navy uppercase tracking-wider mb-3">I Want To:</label>
                  <div className="flex flex-wrap gap-4">
                    {['Monitor', 'Partner', 'Contribute Data', 'Invest'].map((item) => (
                      <label key={item} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" value={item} {...register('intent')} className="w-5 h-5 rounded border-atmos-fog text-atmos-blue focus:ring-atmos-blue" />
                        <span className="font-sans text-atmos-navy">{item}</span>
                      </label>
                    ))}
                  </div>
                  {errors.intent && <p className="text-red-500 text-xs mt-1">{errors.intent.message}</p>}
                </div>

                <div>
                  <label className="block font-sans text-sm font-bold text-atmos-navy uppercase tracking-wider mb-2">Message</label>
                  <textarea rows={4} {...register('message')} className={`w-full bg-white/50 border ${errors.message ? 'border-red-400' : 'border-atmos-fog'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-atmos-blue text-atmos-navy resize-none`} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <div className="mt-4">
                  <button type="submit" disabled={isSubmitting} className="w-full relative px-8 py-4 bg-white/30 backdrop-blur-md border border-white/50 rounded-xl font-sans font-bold text-atmos-navy uppercase tracking-wider overflow-hidden group hover:shadow-[0_0_30px_rgba(91,184,245,0.3)] transition-all duration-300">
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      {isSubmitting ? 'Transmitting...' : 'Send Transmission'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-atmos-deep to-atmos-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Decorative background element */}
      <div className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] bg-atmos-sky rounded-full blur-[120px] opacity-50 pointer-events-none -z-10" />
      <div className="absolute bottom-0 -left-[10%] w-[500px] h-[500px] bg-atmos-glow rounded-full blur-[120px] opacity-20 pointer-events-none -z-10" />
    </div>
  );
};

export default Contact;

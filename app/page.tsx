import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ServiceCard from '../components/ServiceCard';
import { 
  HeartHandshake, 
  GraduationCap, 
  Stethoscope, 
  Soup, 
  Trees, 
  TriangleAlert,
  Milk,
  Sprout,
  Leaf,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

// Custom Cow icon if needed, or use Heart
const GauSevaIcon = Milk;

const HomePage = () => {
  const services = [
    {
      title: 'गरीबों की मदद',
      description: 'जरूरतमंद एवं आर्थिक रूप से कमजोर लोगों को आवश्यक सहायता, वस्त्र, राशन और सहयोग प्रदान करना।',
      icon: HeartHandshake
    },
    {
      title: 'Health camps',
      description: 'निःशुल्क स्वास्थ्य शिविर, चिकित्सा परामर्श, दवाइयों का वितरण और स्वास्थ्य जागरूकता कार्यक्रम आयोजित करना।',
      icon: Stethoscope
    },
    {
      title: 'गौ सेवा',
      description: 'गौ माता की सेवा, संरक्षण, भोजन व्यवस्था और देखभाल के कार्यों को बढ़ावा देना।',
      icon: GauSevaIcon
    },
    {
      title: 'Food donation',
      description: 'भूखे एवं जरूरतमंद लोगों को भोजन वितरण कर मानवता की सेवा करना।',
      icon: Soup
    },
    {
      title: 'Tree plantation',
      description: 'पर्यावरण संरक्षण और हरित भविष्य के लिए वृक्षारोपण अभियान चलाना।',
      icon: Trees
    },
    {
      title: 'गोबर खाद वितरण',
      description: 'किसानों को निःशुल्क गोबर खाद उपलब्ध कराना, जिससे खेती की लागत कम हो और भूमि की उर्वरता बढ़े।',
      icon: Sprout
    },
    {
      title: 'Herbal Agriculture',
      description: 'रसायन मुक्त, प्राकृतिक और हर्बल कृषि को बढ़ावा देना और किसानों को जागरूक करना।',
      icon: Leaf
    },
    {
      title: 'दूध एवं छाछ वितरण',
      description: 'गरीब, वृद्ध एवं बीमार लोगों को निःशुल्क दूध और छाछ उपलब्ध कराकर सेवा करना।',
      icon: Milk
    },
    {
      title: 'धार्मिक अनुष्ठान सेवा',
      description: 'कल्याण हेतु निःशुल्क यज्ञ, पूजा एवं धार्मिक अनुष्ठान आयोजित किए जाते हैं।',
      icon: Sparkles
    }
  ];

  return (
    <div>
      <HeroSlider />

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-600 font-bold uppercase tracking-widest text-sm">Welcome to Shri Shivcharan Trust</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-8 leading-tight">
                सेवा ही धर्म, <br />
                <span className="text-orange-500 text-2xl md:text-4xl">मानवता ही कर्म।</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट एक समर्पित सामाजिक संस्था है, जो मानवता की सेवा एवं समाज कल्याण हेतु निरंतर कार्यरत है। हमारा उद्देश्य जरूरतमंद लोगों की सहायता, स्वास्थ्य सेवाएँ, भोजन वितरण, गौ सेवा तथा भारतीय संस्कृति एवं संस्कारों का संरक्षण करना है।
              </p>
              <Link href="/about" className="text-orange-600 font-bold border-b-2 border-orange-600 pb-1 hover:text-orange-700 hover:border-orange-700 transition uppercase text-sm tracking-wider">
                Learn More About Us
              </Link>
            </div>
            <div className="relative">
               <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-full z-0"></div>
               <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-50 rounded-full z-0"></div>
               <img 
                 src="/logo.png" 
                 alt="Trust Logo Large" 
                 className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl rounded-3xl"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">हमारा कार्य (Our Work)</h2>
            <p className="max-w-2xl mx-auto text-gray-500">
              मानव सेवा, गौ सेवा और संस्कारों के प्रति हमारा समर्पण।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-primary inline-block">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center uppercase tracking-widest text-sm font-bold">
            <div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2">500+</div>
              <div>People Assisted</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2">50+</div>
              <div>Volunteers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2">10+</div>
              <div>Events Done</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2">100+</div>
              <div>Cows Cared</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-900 rounded-3xl p-12 md:p-20 text-center relative z-10 shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">समाज सेवा का हिस्सा बनें</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            आपका एक छोटा सा सहयोग किसी के जीवन में बड़ा बदलाव ला सकता है। आज ही दान करें या स्वयंसेवक के रूप में जुड़ें।
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/donate" className="btn-primary">
              Donate Now
            </Link>
            <Link href="/volunteer" className="bg-white text-gray-900 font-bold py-3 px-10 rounded-full hover:bg-gray-100 transition">
              Join Us
            </Link>
          </div>
        </div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-orange-100 rounded-full -translate-x-1/2 -translate-y-1/2 z-0 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-50 rounded-full translate-x-1/3 translate-y-1/3 z-0 opacity-50"></div>
      </section>
    </div>
  );
};

export default HomePage;

import React from 'react';
import { HeartHandshake, GraduationCap, Stethoscope, Soup, Trees, Milk, ShieldCheck, Heart, Sprout, Leaf, Sparkles, Sun } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      title: 'गरीबों की मदद',
      engTitle: 'Helping the Needy',
      description: 'हम आर्थिक रूप से कमजोर परिवारों को बुनियादी आवश्यकताएं जैसे वस्त्र, राशन, और वित्तीय सहायता प्रदान करते हैं ताकि वे सम्मानजनक जीवन जी सकें।',
      icon: <HeartHandshake size={48} />,
      color: 'bg-orange-50 text-orange-600'
    },
    {
      title: 'Health camps',
      engTitle: 'Medical Healthcare',
      description: 'ग्रामीण और पिछड़े क्षेत्रों में निःशुल्क स्वास्थ्य शिविर लगाना, जाँच कराना और आवश्यक दवाएँ वितरित करना हमारी स्वास्थ्य प्राथमिकता है।',
      icon: <Stethoscope size={48} />,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'गौ सेवा',
      engTitle: 'Cow Protection',
      description: 'गौ माता का संरक्षण और सेवा भारतीय संस्कृति का मूल है। हम गौशालाओं में चारे, पानी और चिकित्सा की उचित व्यवस्था के लिए निरंतर कार्यरत हैं।',
      icon: <Milk size={48} />,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Food donation',
      engTitle: 'Hunger Relief',
      description: 'भोजन वितरण कार्यक्रम के माध्यम से हम यह सुनिश्चित करते हैं कि हमारे क्षेत्र में कोई भी भूखा न सोए। हम रोजाना पौष्टिक भोजन वितरित करते हैं।',
      icon: <Soup size={48} />,
      color: 'bg-red-50 text-red-600'
    },
    {
      title: 'Tree plantation',
      engTitle: 'Environmental Care',
      description: 'पर्यावरण को बचाने के लिए हम सामूहिक वृक्षारोपण अभियान चलाते हैं और लोगों को हरियाली के प्रति जागरूक करते हैं।',
      icon: <Trees size={48} />,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'किसानों के लिए निःशुल्क गोबर खाद वितरण',
      engTitle: 'Free Manure Distribution',
      description: 'प्राकृतिक और जैविक खेती को बढ़ावा देने के लिए किसानों को निःशुल्क गोबर खाद उपलब्ध कराना, जिससे खेती की लागत कम हो और भूमि की उर्वरता बढ़े।',
      icon: <Sprout size={48} />,
      color: 'bg-lime-50 text-lime-600'
    },
    {
      title: 'Herbal Agriculture / जैविक एवं हर्बल कृषि प्रोत्साहन',
      engTitle: 'Organic Farming',
      description: 'रसायन मुक्त, प्राकृतिक और हर्बल कृषि को बढ़ावा देना, किसानों को नई तकनीकों, जैविक खेती के तरीकों और टिकाऊ कृषि पद्धतियों के बारे में जागरूक करना।',
      icon: <Leaf size={48} />,
      color: 'bg-teal-50 text-teal-600'
    },
    {
      title: 'निःशुल्क दूध एवं छाछ वितरण',
      engTitle: 'Free Milk Distribution',
      description: 'गरीब, जरूरतमंद, वृद्ध एवं बीमार लोगों को निःशुल्क दूध और छाछ उपलब्ध कराकर पोषण, स्वास्थ्य और सेवा का कार्य करना।',
      icon: <Milk size={48} />,
      color: 'bg-sky-50 text-sky-600'
    },
    {
      title: 'निःशुल्क यज्ञ एवं धार्मिक अनुष्ठान सेवा',
      engTitle: 'Spiritual Services',
      description: 'समृद्धि, बीमारी निवारण, पितृ शांति तथा सर्वजन कल्याण हेतु निःशुल्क यज्ञ, पूजा एवं धार्मिक अनुष्ठान आयोजित किए जाते हैं।',
      icon: <Sparkles size={48} />,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <div className="bg-white pb-24">
      {/* Header Section */}
      <section className="bg-orange-600 py-24 text-white text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 uppercase tracking-wider">हमारा कार्य (Our Work)</h1>
          <p className="max-w-3xl mx-auto text-orange-50 text-lg opacity-90">
             श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट विभिन्न सामाजिक और धर्मार्थ परियोजनाओं के माध्यम से समाज में खुशहाली और सकारात्मक बदलाव लाने के लिए समर्पित है।
          </p>
        </div>
        {/* Background decorative SVG circles */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full"></div>
      </section>

      {/* Services Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 group">
               <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-10 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${service.color}`}>
                  {service.icon}
               </div>
               <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
               <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-6">{service.engTitle}</p>
               <p className="text-gray-600 leading-relaxed mb-8">
                 {service.description}
               </p>
               <div className="h-1 w-12 bg-gray-100 group-hover:w-full group-hover:bg-orange-600 transition-all duration-500 rounded-full"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Why We Serve Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                 <h2 className="text-3xl font-extrabold text-gray-900 mb-8 underline decoration-orange-600 underline-offset-8">हम सेवा क्यों करते हैं? (Philosophy)</h2>
                 <p className="text-gray-600 text-lg leading-loose mb-8">
                   हमारा मानना है कि हर सक्षम व्यक्ति का कर्तव्य है कि वह समाज के जरूरतमंद तबके की सहायता करें। श्री शिवचरण ट्रस्ट उस कड़ी का काम करता है जो दानदाताओं और जरूरतमंदों को जोड़ता है।
                 </p>
                 <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm text-green-600"><ShieldCheck size={24} /></div>
                      <p className="text-gray-700 font-bold uppercase tracking-wider text-sm">100% पारदर्शी कार्य (Transparency)</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm text-red-600"><Heart size={24} /></div>
                      <p className="text-gray-700 font-bold uppercase tracking-wider text-sm">बिना किसी भेदभाव के सेवा (Inclusivity)</p>
                    </div>
                 </div>
              </div>
              <div className="bg-white p-12 rounded-[50px] shadow-2xl relative">
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-100 rounded-full -z-0"></div>
                  <p className="text-2xl font-medium text-gray-800 leading-relaxed italic relative z-10">
                    "परहित सरिस धरम नहिं भाई" <br />
                    <span className="text-sm text-gray-500 block mt-4 font-bold not-italic font-sans">— दूसरों की सेवा से बढ़कर कोई दूसरा धर्म नहीं है।</span>
                  </p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

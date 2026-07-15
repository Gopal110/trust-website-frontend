import React from 'react';
import { Heart, Target, Eye, BadgeCheck, Users, ShieldCheck, Sun } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-white overflow-hidden">
      {/* Modern Hero Section */}
      <section className="relative pt-32 pb-20 bg-gray-50">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50 rounded-bl-[100px] -z-0 hidden lg:block"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                 <Sun size={14} />
                 <span>किरण आशा की</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-8">
                मानवता की सेवा <br />
                <span className="text-orange-600 italic">हमारा परम धर्म</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl">
                श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट एक समर्पित सामाजिक संस्था है। हम समाज के हर वर्ग तक सेवा और खुशहाली पहुँचाने के लिए प्रतिबद्ध हैं।
              </p>
              <div className="flex flex-wrap gap-4">
                 <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="bg-orange-600 text-white p-3 rounded-xl"><Heart size={20} /></div>
                    <div>
                       <p className="text-xs text-gray-400 font-bold uppercase">संकल्प</p>
                       <p className="text-sm font-bold text-gray-800">निःस्वार्थ सेवा</p>
                    </div>
                 </div>
                 <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="bg-orange-600 text-white p-3 rounded-xl"><Users size={20} /></div>
                    <div>
                       <p className="text-xs text-gray-400 font-bold uppercase">लक्ष्य</p>
                       <p className="text-sm font-bold text-gray-800">सशक्त समाज</p>
                    </div>
                 </div>
              </div>
            </div>
            <div className="relative">
               <div className="aspect-square bg-orange-200 rounded-[40px] rotate-6 absolute inset-0 -z-10 translate-x-4 translate-y-4 opacity-50"></div>
               <div className="aspect-square bg-gray-900 rounded-[40px] -rotate-3 overflow-hidden shadow-2xl">
                  {/* Placeholder for trust activity or founder */}
                  <div className="w-full h-full flex items-center justify-center text-orange-500 font-bold text-xl uppercase tracking-widest p-12 text-center border-4 border-dashed border-orange-500/30 m-4 rounded-[30px]">
                     Connecting Hearts through Service
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Asymmetric Cards */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="bg-orange-600 p-12 rounded-[50px] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-orange-400 opacity-20 group-hover:scale-125 transition-transform duration-500">
                   <Target size={120} />
                </div>
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                   <span className="mr-4 bg-white/20 p-3 rounded-2xl"><Target /></span>
                   हमारा मिशन (Mission)
                </h2>
                <p className="text-orange-50 leading-loose text-lg relative z-10">
                   हमारा मिशन मानवता, धर्मार्थ कार्यों, गरीब एवं जरूरतमंद लोगों की सहायता, स्वास्थ्य सेवाएँ, गौ सेवा, भोजन एवं दूध वितरण, जैविक कृषि प्रोत्साहन तथा समाज कल्याण के कार्यों को बढ़ावा देना है। साथ ही भारतीय संस्कृति, धार्मिक मूल्यों, यज्ञ एवं संस्कारों का संरक्षण करते हुए समाज में सेवा, सहयोग, समानता और सकारात्मक परिवर्तन स्थापित करना है।
                </p>
             </div>
             <div className="bg-gray-900 p-12 rounded-[50px] text-white shadow-2xl relative overflow-hidden group lg:mt-12">
                <div className="absolute top-0 right-0 p-8 text-gray-700 opacity-30 group-hover:scale-125 transition-transform duration-500">
                   <Eye size={120} />
                </div>
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                   <span className="mr-4 bg-white/10 p-3 rounded-2xl"><Eye /></span>
                   हमारा विज़न (Vision)
                </h2>
                <p className="text-gray-400 leading-loose text-lg relative z-10">
                   हमारा विज़न एक ऐसे समाज का निर्माण करना है जहाँ हर जरूरतमंद को सहायता, हर व्यक्ति को सम्मान, हर परिवार को सहयोग और हर जीव को संरक्षण मिले। हम सेवा, संस्कार, गौ सेवा, प्राकृतिक कृषि और आध्यात्मिक उत्थान के माध्यम से एक सशक्त, संवेदनशील और आत्मनिर्भर समाज की स्थापना का संकल्प रखते हैं।
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-orange-600 mb-4 text-center">Our Foundation</h2>
              <h3 className="section-title">हमारे मूल सिद्धांत (Core Values)</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'ईमानदारी (Integrity)', desc: 'हर कार्य में पूर्ण पारदर्शिता और सत्यनिष्ठा।', icon: <ShieldCheck /> },
                { title: 'समर्पण (Dedication)', desc: 'बिना किसी स्वार्थ के मानवता की सेवा के प्रति पूर्ण समर्पण।', icon: <Heart /> },
                { title: 'संस्कार (Culture)', desc: 'भारतीय संस्कृति और संस्कारों का संवर्धन एवं संरक्षण।', icon: <BadgeCheck /> }
              ].map((value, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                   <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl mb-8 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                      {value.icon}
                   </div>
                   <h4 className="text-xl font-bold mb-4 text-gray-800">{value.title}</h4>
                   <p className="text-gray-500 leading-relaxed">{value.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Founder Message - Refined Quote Style */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-100 rounded-full blur-[100px] opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block p-6 bg-orange-600 text-white rounded-full mb-12 shadow-xl shadow-orange-600/20">
             <Heart size={40} />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-12 text-gray-900 tracking-tight">संस्थापक संदेश (Founder Message)</h2>
          <div className="bg-gray-50 p-10 md:p-20 rounded-[60px] border border-gray-100 relative">
             <span className="absolute top-6 left-10 text-9xl text-orange-200 font-serif leading-none italic select-none opacity-50">“</span>
             <p className="text-xl md:text-2xl text-gray-700 italic leading-snug mb-10 relative z-10">
               "सच्ची सेवा ही सबसे बड़ा धर्म है। हमारा संकल्प है कि सेवा, सहयोग और संस्कारों के माध्यम से समाज में सकारात्मक परिवर्तन लाया जाए तथा हर जरूरतमंद तक सहायता पहुँचाई जाए।"
             </p>
             <div className="relative z-10">
               <p className="text-2xl font-black text-orange-600 uppercase tracking-widest">श्री शिवचरण</p>
               <p className="text-sm font-bold text-gray-400 mt-2 uppercase">Visionary Founder</p>
             </div>
          </div>
        </div>
      </section>

      {/* History Timeline placeholder */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                 <h2 className="text-4xl font-bold mb-8 underline decoration-orange-600 decoration-4 underline-offset-[16px]">हमारा इतिहास (History)</h2>
                 <p className="text-gray-400 text-lg leading-loose mb-6">
                   श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट की स्थापना समाज सेवा, मानव कल्याण और धर्मार्थ कार्यों के उद्देश्य से की गई। संस्था का गठन इस संकल्प के साथ हुआ कि जरूरतमंद लोगों तक सहायता पहुँचाई जाए और समाज में सेवा, सहयोग एवं संस्कारों की भावना को मजबूत किया जाए।
                 </p>
                 <p className="text-gray-400 text-lg leading-loose">
                   आज श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट सेवा, विश्वास और समर्पण का प्रतीक बनकर समाज में सकारात्मक परिवर्तन की दिशा में आगे बढ़ रहा है।
                 </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-gray-800 p-8 rounded-[30px] border border-gray-700">
                    <p className="text-4xl font-bold text-orange-600 mb-2">500+</p>
                    <p className="text-xs uppercase font-bold tracking-widest text-gray-500">Service Hours</p>
                 </div>
                 <div className="bg-gray-800 p-8 rounded-[30px] border border-gray-700 mt-8">
                    <p className="text-4xl font-bold text-orange-600 mb-2">12A</p>
                    <p className="text-xs uppercase font-bold tracking-widest text-gray-500">Certification</p>
                 </div>
                 <div className="bg-gray-800 p-8 rounded-[30px] border border-gray-700">
                    <p className="text-4xl font-bold text-orange-600 mb-2">80G</p>
                    <p className="text-xs uppercase font-bold tracking-widest text-gray-500">Tax Benefit</p>
                 </div>
                 <div className="bg-gray-800 p-8 rounded-[30px] border border-gray-700 mt-8">
                    <p className="text-4xl font-bold text-orange-600 mb-2">100%</p>
                    <p className="text-xs uppercase font-bold tracking-widest text-gray-500">Transparancy</p>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

import React from "react";

const AboutUs = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center text-white bg-pink-200">
        {/* <img
          src="https://source.unsplash.com/1600x900/?shopping"
          alt="About Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        /> */}
        <div className="relative z-10 text-center px-6 text-black">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Not Just a Store — A Story
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            At Hekto, we blend creativity, technology, and sustainability into a
            seamless shopping experience.
          </p>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-16 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          What Drives Us
        </h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: "⚡",
              title: "Speed & Simplicity",
              desc: "Fast shopping, fast shipping.",
            },
            {
              icon: "🌍",
              title: "Eco-Friendly",
              desc: "Zero plastic. 100% love.",
            },
            {
              icon: "💡",
              title: "AI-Powered Discovery",
              desc: "Smart suggestions that get you.",
            },
            {
              icon: "🛡️",
              title: "Trust First",
              desc: "Returns made easy. Service 24/7.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      {/* Unique Values Section */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          How We're Different
        </h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {[
            {
              title: "Customer Obsession",
              desc: "We listen, learn, and adapt — ensuring every customer feels heard and valued.",
              icon: "❤️",
            },
            {
              title: "Design-First Thinking",
              desc: "From packaging to product curation, everything is crafted with visual joy and utility.",
              icon: "🎨",
            },
            {
              title: "Fair & Transparent Pricing",
              desc: "We eliminate hidden costs and middlemen — quality doesn’t have to be expensive.",
              icon: "🔍",
            },
            {
              title: "Inclusive Culture",
              desc: "We support diverse creators, communities, and collaborate to uplift ethical brands.",
              icon: "🌈",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-pink-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-pink-50 py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Meet Our Creators
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {[
            {
              name: "Ava Wilson",
              role: "CEO",
              img: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
              name: "Liam Carter",
              role: "CTO",
              img: "https://randomuser.me/api/portraits/men/46.jpg",
            },
            {
              name: "Zara Lee",
              role: "Creative Director",
              img: "https://randomuser.me/api/portraits/women/65.jpg",
            },
            {
              name: "Ethan Miles",
              role: "Product Manager",
              img: "https://randomuser.me/api/portraits/men/52.jpg",
            },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

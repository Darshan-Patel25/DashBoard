import React from "react";
import profile1 from "../assets/profile_1.jpg";
import profile2 from "../assets/profile_2.jpg";
import profile3 from "../assets/profile_5.webp";
import profile4 from "../assets/profile_img4.png";

const testimonials = [
  {
    id: 1,
    name: "Kevin Wilson",
    role: "CEO",
    content:
      "Tredify helped me finally understand performance in a relevant way. The analytics are clear and concise, and I'm now able to boost my strategy to get more engagement than ever before!",
    avatar: profile1,
  },
  {
    id: 2,
    name: "Daniel Lee",
    role: "Marketing Consultant",
    content:
      "As a freelancer, Trendify gives me all the tools I need to keep my social media strategy organized. The interface is clean and intuitive, and the insights are incredibly helpful in optimizing my content.",
    avatar: profile2,
  },
  {
    id: 3,
    name: "Elena Hill",
    role: "Digital Designer",
    content:
      "I love how easy it is to manage my social media accounts with Tredify. The interface is clean and user-friendly, and I'm really impressed by its content recommendations.",
    avatar: profile3,
  },
  {
    id: 4,
    name: "Liza Wells",
    role: "Manager",
    content:
      "Trendify has completely changed how I manage my social media. The analytics make it so easy to understand performance and improve engagement. I've seen a noticeable increase in my follower count since I started using it.",
    avatar: profile4,
  },
   {
    id: 4,
    name: "Elena Hill",
    role: "Digital Designer",
    content:
      "I love how easy it is to manage my social media accounts with Trendify. The interface is clean and user-friendly, and I'm really impressed by its content recommendations.",
    avatar: profile3,
  },
   {
    id: 5,
    name: "Elena Hill",
    role: "Digital Designer",
    content:
      "I love how easy it is to manage my social media accounts with Trendify. The interface is clean and user-friendly, and I'm really impressed by its content recommendations.",
    avatar: profile1,
  },
];

function TestimonialCard({ name, role, content, avatar }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
      <p className="text-gray-600 mb-4">{content}</p>
      <div className="flex items-center mt-4">
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div className="bg-gradient-to-tr from-blue-50 to-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Customer Testimonials
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Trusted by Thousands, Loved by Everyone
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;

// import "./Testimonials.css"
import "../Styles/Testimonials.css"
const testimonials = [
  {
    id: 1,
    name: "Kevin Wilson",
    role: "CEO",
    content:
      "TravelPlus helped me finally understand performance in a relevant way. The analytics are clear and concise, and I'm now able to boost my strategy to get more engagement than ever before!",
    avatar:
      "src/assets/profile_1.jpg",
  },
  {
    id: 2,
    name: "Daniel Lee",
    role: "Marketing Consultant",
    content:
      "As a freelancer, TravelPlus gives me all the tools I need to keep my social media strategy organized. The interface is clean and intuitive, and the insights are incredibly helpful in optimizing my content.",
    avatar:
      "src/assets/profile_2.jpg",
  },
  {
    id: 3,
    name: "Elena Hill",
    role: "Digital Designer",
    content:
      "I love how easy it is to manage my social media accounts with TravelPlus. The interface is clean and user-friendly, and I'm really impressed by its content recommendations.",
    avatar:
      "src/assets/profile_5.webp",
  },
  {
    id: 4,
    name: "Liza Wells",
    role: "Manager",
    content:
      "TravelPlus has completely changed how I manage my social media. The analytics make it so easy to understand performance and improve engagement. I've seen a noticeable increase in my follower count since I started using it.",
    avatar:
      "src/assets/profile_img4.png",
  },
  {
    id: 5,
    name: "Nicole Cooper",
    role: "Marketing Specialist",
    content:
      "With TravelPlus, managing multiple social media accounts has never been easier. The analytics are comprehensive, and the scheduling features help me collaborate with my team. It's saved us hours of work every week!",
    avatar:
      "src/assets/avatarneelan copy.webp",
  },
  {
    id: 6,
    name: "Guy Hawkins",
    role: "Social Media Consultant",
    content:
      "Before using TravelPlus, I struggled to make sense of all the metrics given to me. Now, I can easily see which posts are going to drive engagement, and the insights are incredibly valuable. I can't imagine how I worked on campaigns before!",
    avatar:
      "src/assets/avatarsubham copy.webp",
  },
]

function TestimonialCard({ name, role, content, avatar }) {
  return (
    <div className="testimonial-card">
      <p className="testimonial-content">{content}</p>
      <div className="testimonial-author">
        <img src={avatar || "/placeholder.svg"} alt={`${name}'s avatar`} className="author-avatar" />
        <div className="author-info">
          <h4>{name}</h4>
          <p>{role}</p>
        </div>
      </div>
    </div>
  )
}

function Testimonials() {
  return (
    <div className="testimonials-section">
      <div className="testimonials-container">
        <h2>Customer Testimonials</h2>
        <p className="subtitle">Trusted by Thousands, Loved by Everyone</p>
        <div className="testimonials-grid">
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
  )
}

export default Testimonials


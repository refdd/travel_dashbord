// components/messages/Avatar.jsx
export default function Avatar({ show, img }) {
  if (!show) return null;
  return (
    <div className="absolute -bottom-1 -left-5 w-6 h-6 rounded-full overflow-hidden ring-2 ring-[#202c33]">
      <img src={img} alt="Avatar" className="w-full h-full object-cover" />
    </div>
  );
}

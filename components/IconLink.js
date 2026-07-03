export default function IconLink({ href, label, icon: Icon, external = true, size = 15, strokeWidth }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      title={label}
      className="inline-flex h-8 w-8 items-center justify-center text-muted transition-colors duration-150 ease-out hover:text-accent focus-visible:text-accent"
    >
      <Icon size={size} strokeWidth={strokeWidth} />
    </a>
  );
}

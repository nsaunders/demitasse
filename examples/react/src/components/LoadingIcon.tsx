export default function LoadingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width={18} height={18} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
      />
    </svg>
  );
}

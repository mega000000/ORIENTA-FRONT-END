import { SvgIcon } from '@mui/material';

// 1. Dashboard Icon (Grid Doodle)
export function DoodleDashboard(props) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      {/* Accent block */}
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="2" fill="#635BFF" fillOpacity="0.25" />
      {/* Hand-drawn borders */}
      <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      {/* Inner mini dot accent */}
      <circle cx="7" cy="7" r="1.2" fill="currentColor" />
    </SvgIcon>
  );
}

// 2. Assessment / Quiz Icon (Sticky Note / Card Doodle)
export function DoodleQuiz(props) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      {/* Purple accent layer */}
      <path d="M5 4h12l3 3v13H5z" fill="#635BFF" fillOpacity="0.2" />
      {/* Outline paper */}
      <path d="M4 3h13l4 4v14H4V3z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      {/* Folded corner */}
      <path d="M17 3v4h4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      {/* Doodle lines */}
      <path d="M8 10h8M8 14h5M8 17h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

// 3. Specialties / Compass Doodle
export function DoodleExplore(props) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" fill="none" />
      {/* Needle with purple highlight */}
      <polygon points="12,6 15,12 12,11 9,12" fill="#635BFF" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="12,18 15,12 12,13 9,12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </SvgIcon>
  );
}

// 4. Recommendations / Magic Sparkles Doodle
export function DoodleRecommend(props) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      {/* Main Star */}
      <path
        d="M12 2l2.4 5.8L20 9.5l-4.5 4.2 1.3 6.3L12 16.8 7.2 20l1.3-6.3L4 9.5l5.6-1.7L12 2z"
        fill="#635BFF"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Small Sparkle Accent */}
      <path d="M19 3v4M17 5h4" stroke="#635BFF" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

// 5. Profile / User Doodle
export function DoodleProfile(props) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="7" r="4" fill="#635BFF" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M4 21v-1.5C4 16 7.5 14 12 14s8 2 8 5.5V21"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7" r="1.5" fill="currentColor" />
    </SvgIcon>
  );
}

// 6. Calendar / Notebook Doodle
export function DoodleCalendar(props) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      {/* Spiral rings */}
      <path d="M7 2v3M12 2v3M17 2v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Header wavy line */}
      <path d="M4 8c2-1 4 1 6 0s4 1 6 0 3-0.5 4-0.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Card body */}
      <rect x="3.5" y="4.5" width="17" height="17" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
      {/* Purple square accent in corner */}
      <rect x="6" y="12" width="6" height="6" rx="1.5" fill="#635BFF" stroke="currentColor" strokeWidth="1.5" />
      {/* Dashed selection box */}
      <rect x="10" y="9" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
      {/* Mini cursor arrow */}
      <path d="M16 15l3 3-1.5 0.5-0.5 1.5-1-5z" fill="white" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </SvgIcon>
  );
}

// 7. Trophy / Achievement Doodle
export function DoodleTrophy(props) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M6 4h12v6c0 3.3-2.7 6-6 6s-6-2.7-6-6V4z" fill="#635BFF" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 6H3c0 2.2 1.8 4 4 4M18 6h3c0 2.2-1.8 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 16v4M8 20h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

// 8. Graduation / Learning Doodle
export function DoodleGraduation(props) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <polygon points="12,3 2,8 12,13 22,8" fill="#635BFF" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6 10.5v5c0 2 3 3.5 6 3.5s6-1.5 6-3.5v-5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M22 8v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

// 9. Brain / Assessment Doodle
export function DoodleBrain(props) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      {/* Subtle Purple Accent Backing */}
      <path
        d="M9.5 4.5a3.5 3.5 0 00-3.5 3.5c0 .35.08.68.2 1A3.5 3.5 0 004 12a3.5 3.5 0 002.5 3.3v.2A3.5 3.5 0 0010 19h2a3.5 3.5 0 003.5-3.5v-.2A3.5 3.5 0 0018 12a3.5 3.5 0 00-2.2-3.4c.1-.32.2-.65.2-1.1A3.5 3.5 0 0012.5 4.5h-3z"
        fill="#635BFF"
        fillOpacity="0.2"
      />
      {/* Hand-Drawn Brain Outlines */}
      <path
        d="M12 4.5v14.5M9.5 4.5a3.5 3.5 0 00-3.5 3.5c0 .35.08.68.2 1A3.5 3.5 0 004 12a3.5 3.5 0 002.5 3.3v.2A3.5 3.5 0 0010 19h2a3.5 3.5 0 003.5-3.5v-.2A3.5 3.5 0 0018 12a3.5 3.5 0 00-2.2-3.4c.1-.32.2-.65.2-1.1A3.5 3.5 0 0012.5 4.5h-3z"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner gyri curves */}
      <path
        d="M8 8.5c1 1 2 1 2 2.5M14 11c0-1.5 1-1.5 2-2.5M7.5 14c1.5 0 2 .5 2.5 1.5M14 15.5c.5-1 1-1.5 2.5-1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </SvgIcon>
  );
}
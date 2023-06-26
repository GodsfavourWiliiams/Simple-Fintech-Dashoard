export const Notification = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.75 13.5176C15.75 13.8836 15.4533 14.1804 15.0872 14.1804H2.91279C2.54674 14.1804 2.25 13.8836 2.25 13.5176C2.25 13.1515 2.54674 12.8548 2.91279 12.8548H2.925V8.23579C2.925 4.92979 5.64525 2.25012 9 2.25012C12.3548 2.25012 15.075 4.92979 15.075 8.23579V12.8548H15.0872C15.4533 12.8548 15.75 13.1515 15.75 13.5176ZM4.275 12.8548H13.725V8.23579C13.725 5.66217 11.6096 3.5757 9 3.5757C6.39045 3.5757 4.275 5.66217 4.275 8.23579V12.8548ZM7.48203 15.567C7.29841 15.1957 7.64829 14.8431 8.0625 14.8431H9.9375C10.3517 14.8431 10.7016 15.1957 10.518 15.567C10.4366 15.7315 10.3274 15.8831 10.1932 16.0148C9.87678 16.3255 9.44755 16.5001 9 16.5001C8.55245 16.5001 8.12323 16.3255 7.80676 16.0148C7.6726 15.8831 7.56337 15.7315 7.48203 15.567Z"
        fill="black"
      />
      <circle cx="13.1252" cy="4.87488" r="3.375" fill="white" />
      <circle cx="13.1252" cy="4.87512" r="2.625" fill="#F30066" />
    </svg>
  );
};

export const PlusIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}>
      <path
        fill={color}
        fillRule="evenodd"
        d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"
      />
    </svg>
  );
};

export const Hamburger = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 7H19"
        stroke="#000000"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12L19 12"
        stroke="#000000"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 17L19 17"
        stroke="#000000"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

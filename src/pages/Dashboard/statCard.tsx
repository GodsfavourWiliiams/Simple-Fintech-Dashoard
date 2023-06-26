type Props = {
  title: string;
  value: string;
};

const StatCard = (props: Props) => {
  return (
    <div className="flex items-start flex-col justify-start gap-3 p-4 bg-white text-gray-800 rounded-lg shadow-xs">
      <div className="flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 bg-green-100 rounded-full"
          width="40"
          height="40"
          id="nigeria">
          <g fillRule="evenodd" strokeWidth="1pt">
            <path fill="#fff" d="M0 0h639.98v479.998H0z"></path>
            <path
              fill="#36a100"
              d="M426.654 0H639.98v479.998H426.654zM0 0h213.327v479.998H0z"></path>
          </g>
        </svg>
        <span className="text-sm">NGN</span>
      </div>

      <div className="items-start">
        <p className="mb-2 text-md font-medium capitalize">{props.title}</p>
        <p className="text-[20px] font-semibold  ">{props.value}</p>
      </div>
    </div>
  );
};

export default StatCard;

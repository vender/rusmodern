import React from "react";
interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name?: string;
	value?: string | any;
}

const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
	({ name, ...rest }, ref) => {
		
		return (
			<label className="group flex items-center text-heading text-sm cursor-pointer">
				<input
					type="checkbox"
					className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading checked:hover:bg-heading checked:focus:bg-heading"
					ref={ref}
					{...rest}
				/>
				<span className="ms-2 -mt-0.5">{name}</span>
			</label>
		);
	}
);

CheckBox.displayName = 'CheckBox';

export default CheckBox;
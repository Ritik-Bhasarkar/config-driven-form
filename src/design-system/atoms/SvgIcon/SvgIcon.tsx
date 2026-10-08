//a reusable SvgIcon component that render a SVG as a css mask

interface SvgIconProps {
	url: string;
	width?: number;
	height?: number;
}

export const SvgIcon = ({ url, width = 16, height = 16 }: SvgIconProps) => {
	return (
		<span
			aria-hidden="true"
			style={{
				display: "inline-block",
				width,
				height,
				flexShrink: 0,
				backgroundColor: "currentColor",
				mask: `url("${url}") center / 100% no-repeat`,
				WebkitMask: `url("${url}") center / 100% no-repeat`,
			}}
		/>
	);
};

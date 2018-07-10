import Typography from "typography";
import fairyGateTheme from "typography-theme-fairy-gates";

fairyGateTheme.overrideThemeStyles = () => ({
	'body': {
		backgroundColor: "thistle",
	}
})

const typography = new Typography(fairyGateTheme);

export default typography;
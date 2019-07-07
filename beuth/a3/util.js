/**
 * Created by Burak Günaydin (853872) at Beuth University.
 */
const util = {
	exists(element, defaultValue) {
		if (element !== undefined) return element;
		return defaultValue;
	}
};

export default util;

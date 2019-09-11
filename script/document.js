/**
 *
 */

const _ = undefined;

/**
 *
 */
const d = {
	/**
	 *
	 */
	id: (id, target = _) => {
		return target === _
			? document.getElementById(id)
			: target.getElementById(id);
	},

	/**
	 *
	 */
	className: (className, target = _) => {
		return target === _
			? document.getElementsByClassName(className)[0]
			: target.getElementsByClassName(className)[0];
	},

	/**
	 *
	 */
	classNames: (className, target = _) => {
		return target === _
			? document.getElementsByClassName(className)
			: target.getElementsByClassName(className);
	},

	/**
	 *
	 */
	tag: (tag, target = _) => {
		return target === _
			? document.getElementsByTagName(tag)[0]
			: target.getElementsByTagName(tag)[0];
	},

	/**
	 *
	 */
	tags: (tag, target = _) => {
		return target === _
			? document.getElementsByTagName(tag)
			: target.getElementsByTagName(tag);
	}
};

export default d;

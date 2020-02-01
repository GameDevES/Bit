const enum TimeTypes {
	Second = 'SECOND',
	Minute = 'MINUTE',
	Hour = 'HOUR',
	Day = 'DAY',
	Week = 'WEEK',
	Month = 'MONTH',
	Year = 'YEAR'
}

const kTimeDurations: readonly [TimeTypes, number][] = [
	[TimeTypes.Year, 31536000000],
	[TimeTypes.Month, 2628000000],
	[TimeTypes.Week, 1000 * 60 * 60 * 24 * 7],
	[TimeTypes.Day, 1000 * 60 * 60 * 24],
	[TimeTypes.Hour, 1000 * 60 * 60],
	[TimeTypes.Minute, 1000 * 60],
	[TimeTypes.Second, 1000]
];

export default function(duration: number, assets: DurationFormatAssetsTime, precision = 7) {
	const output: string[] = [];

	for (const [type, timeDuration] of kTimeDurations) {
		const substraction = duration / timeDuration;
		if (substraction < 1) continue;

		const floored = Math.floor(substraction);
		duration -= floored * timeDuration;
		output.push(addUnit(floored, assets[type]));

		if (output.length >= precision) break;
	}

	return output.join(' ') || addUnit(0, assets.SECOND);
}

function addUnit(time: number, unit: DurationFormatAssetsUnit) {
	if (time in unit) return `${time} ${unit[time]}`;
	return `${time} ${unit.DEFAULT}`;
}

interface DurationFormatAssetsUnit extends Record<number, string> {
	DEFAULT: string;
}

interface DurationFormatAssetsTime {
	[TimeTypes.Second]: DurationFormatAssetsUnit;
	[TimeTypes.Minute]: DurationFormatAssetsUnit;
	[TimeTypes.Hour]: DurationFormatAssetsUnit;
	[TimeTypes.Day]: DurationFormatAssetsUnit;
	[TimeTypes.Week]: DurationFormatAssetsUnit;
	[TimeTypes.Month]: DurationFormatAssetsUnit;
	[TimeTypes.Year]: DurationFormatAssetsUnit;
}

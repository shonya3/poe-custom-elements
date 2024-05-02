import { FrameKind } from '../poe.types';

/** https://www.pathofexile.com/developer/docs/reference#type-FrameType */
export function frameKind(frameType: number): FrameKind | null {
	switch (frameType) {
		case 0:
			return 'normal';
		case 1:
			return 'magic';
		case 2:
			return 'rare';
		case 3:
			return 'unique';
		case 4:
			return 'gem';
		case 5:
			return 'currency';
		// case 6:
		// return 'divination card';
		case 11:
			return 'necropolis';
		default:
			return null;
	}
}

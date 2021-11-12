import { MOCK_SOURCES } from "@/constants";
import { Source } from "@/models";

export function generateSources(count: number): Source[] {
	return MOCK_SOURCES.filter((d, index: number) => index <= count);
}

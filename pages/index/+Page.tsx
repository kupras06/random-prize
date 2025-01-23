import React, { useState, useEffect, useTransition } from "react";
import { onGenerateUserPrize } from "./GeneratePrize.telefunc";
import { GeneratePrize} from "./GeneratePrize";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Button, Group, Badge, Box, Text } from "@mantine/core";
const colorCode = {
	regular: "green",
	special: "blue",
	rare: "red",
};
export default function Page() {
	const data = useData<Data>();
	const [currentPrize, setCurrentPrize] = useState(() => data[0]);
	const [prizes, setPrizes] = useState(() => data);
	const [isPending, startTransition] = useTransition();
	const handlePrizeGenerate = () => {
		startTransition(async () => {
			const awaitedPrizes = await onGenerateUserPrize();
			setCurrentPrize(awaitedPrizes[0]);
			setPrizes(awaitedPrizes);
		});
	};
	return <GeneratePrize />
}

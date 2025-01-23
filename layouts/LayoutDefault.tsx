import "@mantine/core/styles.css";
import type React from "react";
import {
	AppShell,
	Burger,
	Group,
	Title,
	Image,
	MantineProvider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import theme from "./theme.js";

import logoUrl from "../assets/logo.svg";
import { Link } from "../components/Link";

export default function LayoutDefault({
	children,
}: { children: React.ReactNode }) {
	const [opened, { toggle }] = useDisclosure();
	return (
		<MantineProvider theme={theme}>
			<AppShell header={{ height: 60 }} padding="md">
				<AppShell.Header>
					<Group h="100%" px="md">
						<Title order={3}>My Prize App</Title>
					</Group>
				</AppShell.Header>
				<AppShell.Main> {children} </AppShell.Main>
			</AppShell>
		</MantineProvider>
	);
}

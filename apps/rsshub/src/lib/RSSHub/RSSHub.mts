import type { Namespace } from "./types.js";

/**
 * Represents a client for interacting with the RSSHub API.
 */
export class RSSHub {
	public host: string;

	/**
	 * Constructs an instance of the RSSHub client.
	 * @param {Object} [options] - Configuration options for the RSSHub client.
	 * @param {string} [options.host="https://rsshub.app"] - The host URL of the RSSHub service.
	 */
	constructor(options?: { host: string }) {
		this.host = options?.host ?? "https://rsshub.app";
	}

	/**
	 * Retrieves data from a specific namespace or all namespaces if no parameter is provided.
	 * @param {string} [namespace] - The optional namespace identifier.
	 * @returns {Promise<Namespace | Record<string, Namespace>>} The namespace data as a `Namespace` object
	 * if a specific namespace is requested, or a record of namespace objects if no namespace is specified.
	 */
	public async getNamespace(): Promise<Record<string, Namespace>>;
	public async getNamespace(namespace: string): Promise<Namespace>;
	public async getNamespace(namespace?: string): Promise<Record<string, Namespace> | Namespace> {
		const url = namespace
			? `${this.host}/api/namespace/${namespace}`
			: `${this.host}/api/namespace`;
		const response = await fetch(url);
		return await response.json();
	}

	/**
	 * Retrieves radar rules for a specific namespace or all radar rules if no namespace is provided.
	 * @param {string} [namespace] - The optional namespace identifier for the radar rules.
	 * @returns {Promise<Namespace | Record<string, Namespace>>} The radar rules as a `Namespace` object
	 * if a specific namespace is requested, or a record of namespace objects if no namespace is specified.
	 */
	public async getRadarRules(): Promise<Record<string, Namespace>>;
	public async getRadarRules(namespace: string): Promise<Namespace>;
	public async getRadarRules(namespace?: string): Promise<Record<string, Namespace> | Namespace> {
		const response = await fetch(`${this.host}/api/radar/rules/${namespace ?? ""}`);
		return await response.json();
	}

	// /**
	//  * Retrieves information about a specific feed.
	//  * @param {string} feedId - The identifier for the feed.
	//  * @returns {Promise<Feed>} The feed information.
	//  */
	// public async getFeedInfo(feedId: string): Promise<Feed> {
	// 	const response = await fetch(`${this.host}/api/feed/${feedId}`);
	// 	return await response.json();
	// }

	// /**
	//  * Lists all available routes/services provided by the RSSHub API.
	//  * @returns {Promise<Service[]>} An array of available services.
	//  */
	// public async listServices(): Promise<Service[]> {
	// 	const response = await fetch(`${this.host}/api/services`);
	// 	return await response.json();
	// }
}

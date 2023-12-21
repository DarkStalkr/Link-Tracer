# LinkTracer
![Texto Alternativo](logo2.png)

LinkTracer is a Google Chrome browser extension that allows users to analyze web links quickly and securely. This extension provides several key features that enhance the browsing experience and help users make informed decisions when clicking on external links.

## Key Features

### Proxy Configuration
The extension allows users to configure a proxy server for anonymous and secure browsing. They can specify the type of proxy, the host, and the desired port.

### Link Analysis
URL Analysis: Perform both static and dynamic analysis of web addresses (URLs) to mitigate the risks associated with fraudulent links and sophisticated phishing tactics. It involves scrutinizing sender information (IP and MAC addresses), request types (POST, GET, etc.), and the target website.

Code Injection Detection: Proactively scan for injected malicious codes, including keyloggers, Beef Hooks, and more, ensuring a robust defense against covert cyber threats.

### Security
LinkTracer automatically disables any potentially dangerous scripts or content on the destination page of the link. This helps protect users from online threats.

Anonymity and Safe Browsing: Operate in a secure environment by masking user identity through proxies, TOR routing, or VPNs, thus prioritizing user privacy and security.

### WHOIS Lookup
The extension performs a WHOIS lookup on the IP address of the linked server to provide information about the owner or organization behind the linked website.

### Abuse Index
LinkTracer checks databases of link abuse indexes to determine if the website linked to has been previously reported for malicious or deceptive activities.

### Configuration Confirmation
When users save the proxy configuration, they receive immediate confirmation in the form of an alert message indicating that the configuration has been successfully saved.

## Installation

To install LinkTracer, follow these steps:

1. [Download the LinkTracer extension](#) from the Chrome Web Store.
2. Click on the extension icon in your Chrome browser to open the settings.
3. Configure your proxy settings (if desired).
4. Activate or deactivate the extension as needed.

Enjoy secure and informed browsing with LinkTracer!

### Current Status:
Right now, I'm working to create a backend server, to make all the requests to the links, due to security policies (CORS)

## Future Scope:
The project is in its nascent stages (version 1.1), and future improvements are envisioned based on its trajectory and user feedback.

## Contributing

Contributions to LinkTracer are welcome! Feel free to open issues and pull requests to help improve the extension.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

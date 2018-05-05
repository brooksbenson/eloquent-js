# JavaScript and The Browser

## Network Protocol

A network protocol describes a style of communication over a network. There are protocols for a variety of activities: sending email, fetching email, or sharing files, to name a few.

## HTTP Protocol

Hypertext Transfer Protocol is a style of communication for retrieving named resources.

## Transmission Control Protocol

A protocol that addresses the problem of making sure that resources sent back from an HTTP request arrive in the correct order and at the correct location. It requires a _server_ to be listening for requests on a port, and a _client_ to make a connection to the servers designated port. This connection creates a two-way pipe by which bits can flow between the server and the client.

## HTML

HTML is the document format used for web pages. They contain a head and a body; the head contains information about the document and the body contains the document itself.

(UTF-8 is a way to encode unicode text as binary data. UTF-8 = Unicode).

HTML uses what are called tags. Tags are used to denote information about the document and can contain what are called attributes. Attributes are used to pass extra information to a tag.

In HTML, an ampersand followed by a name or a character code then a semicolon is called an entity and will be replaced by the encoded character when the document renders.

## Browsers

Browsers are built for rendering HTML documents. There are a handful of major browsers in use. All support mostly the same features. It's important to standardize our code with transpilers so that it works across all browser environments.

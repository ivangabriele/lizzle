# ♟️ [lizzle.org](https://lizzle.org)

[![img-license]][lnk-license] [![img-github]][lnk-github]

Train your chess puzzles using [Lichess database](https://database.lichess.org).

**Table of Contents**

- [Features](#features)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [FAQ](#faq)
  - [What's the point of lizzle.org? Can't I already do that on Lichess?](#whats-the-point-of-lizzleorg-cant-i-already-do-that-on-lichess)
  - [Why do I have to pay for lizzle.org while Lichess is entirely free?](#why-do-i-have-to-pay-for-lizzleorg-while-lichess-is-entirely-free)
  - [I don't want to pay for lizzle.org, how can I get it for free?](#i-dont-want-to-pay-for-lizzleorg-how-can-i-get-it-for-free)
  - [Can I reuse this application for my own?](#can-i-reuse-this-application-for-my-own)
- [License](#license)

## Features

- ♟️ Focus your training within a specific puzzle level range.
- 🦘 Jump to the next puzzle immediatly while still being able to open the last solved puzzle analysis
  _(very useful if you are like me and often don't get why an other oponent move was not better than the one played)_.
- ⚡ Infinite Puzzle Storm mode with no failure allowed (= try until you succeed) to improve your solving time.
- 📉 Solving Time Progress Chart.

## Roadmap

_Documentation in progress..._

## Contributing

Please check the [contributing document](/CONTRIBUTING.md).

## FAQ

### What's the point of [lizzle.org](https://lizzle.org)? Can't I already do that on [Lichess](https://lichess.org)?

You can indeed train the exact same puzzles on [Lichess](https://lichess.org) (and definitely should 😉). But there
are some missing features that at least myself really needed. Those are the ones listed in [Features](#features).

If you want to become a beast at [Puzzle Storm](https://lichess.org/storm) or [Puzzle Racer](https://lichess.org/racer),
or if you want to focus your training around a certain puzzle level range, then [lizzle.org](https://lizzle.org) may
help you quite a lot 😊.

If you don't see the point of these features, then [lizzle.org](https://lizzle.org) is not for you 😌.

### Why do I have to pay for [lizzle.org](https://lizzle.org) while [Lichess](https://lichess.org) is entirely free?

[Lichess](https://lichess.org) is a an amazing but way bigger organization than I am. I clearly don't have the same
userbase size in order to live out of potential donations. I tried to price the subscription so that it can pay at least
for the hosting costs and my coffee (with milk, always!) without excluding too many people who are money-constrained.

### I don't want to pay for [lizzle.org](https://lizzle.org), how can I get it for free?

You can deploy a local instance on your computer following the [Get Started](/CONTRIBUTING.md#get-started) steps in the contributing document.

If you have basic devops knowledge, it's also fairly easy to [deploy it](/CONTRIBUTING.md#deploy) to your own hosting
cloud or server.

But deploying it to a PaaS or a dedicated VPS will cost you more than a single [lizzle.org](https://lizzle.org) subscription. The initial database alone is around ~1GB.

### Can I reuse this application for my own?

You can use this codebase for whatever you wish to produce, including commercial applications, **BUT** you need to share your entire codebase under the same [GNU Affero General Public License](https://www.gnu.org/licenses/agpl-3.0.en.html).

I invite you to read [Why the Affero GPL](https://www.gnu.org/licenses/why-affero-gpl.html) and [Open Source Software
Licenses 101: The AGPL License](https://fossa.com/blog/open-source-software-licenses-101-agpl-license/) but the gist is
that since I use open source code, I publish it as open source myself and intend others who could use my code to do the
same. Which in turn benefits the entire community like it benefited me 😌.

> Users of AGPL-licensed code must:
> - Include a copy of the full license text and the original copyright notice
> - State all significant changes made to the original software
> - Make available the source code when you distribute any works based on the licensed software
> - Include any installation information necessary to update and reinstall the software if the program is being used as
>   part of a consumer device

## License

This entire codebase is released under the [GNU Affero General Public License](./LICENSE.md).

The [Lichess puzzle database](https://database.lichess.org/) is released under the
[Creative Commons CC0 license](https://tldrlegal.com/license/creative-commons-cc0-1.0-universal).

---

[img-github]: https://img.shields.io/github/actions/workflow/status/ivangabriele/lizzle/check.yml?branch=main&style=flat-square
[img-license]: https://img.shields.io/github/license/ivangabriele/lizzle?style=flat-square

[lnk-github]: https://github.com/ivangabriele/lizzle/actions?query=branch%3Amain++
[lnk-license]: https://github.com/ivangabriele/lizzle/blob/main/LICENSE

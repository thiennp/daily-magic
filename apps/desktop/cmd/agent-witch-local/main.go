package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/thiennp/daily-magic/apps/desktop/internal/core"
	"github.com/thiennp/daily-magic/apps/desktop/internal/tray"
)

// iconPNG is set by platform-specific files via embed.
var iconPNG []byte

func main() {
	showVersion := flag.Bool("version", false, "print version and exit")
	flag.Parse()
	if *showVersion {
		fmt.Println(core.Version)
		os.Exit(0)
	}

	platform, err := newPlatform()
	if err != nil {
		fmt.Fprintf(os.Stderr, "agent-witch-local: %v\n", err)
		os.Exit(1)
	}

	app := &tray.App{
		Platform: platform,
		IconPNG:  iconPNG,
	}
	app.Run()
}

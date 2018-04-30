#! /bin/bash
pandoc -o elexis-server.epub --highlight-style pygments -t epub3 --epub-chapter-level=2 section_01.md reference.md



#!/usr/bin/perl

# 8/8/2018

use strict;
use warnings;

use Data::Dumper; # use like this to print an array print Dumper \@array;
use JSON::Parse 'parse_json';

# command line parameters
my $svgFile = '';	# SVG file to modify.
my $colorFile = ''; # JSON file with color scheme.
my $defaultColor = '#509afb';	# Default fill color.
my $defaultRadius = 6;	# Default circle radius

if ($#ARGV == 0) {
	print "\nTakes an SVG file from the bait-bait tool at ProHits-viz and recolors/resize points\n";
  print "\nbased on the specifications in a JSON file.";
	print "\nusage:\n $0\n";
	print "-c [color file; must be JSON format]\n";
	print "-f [fill color (wrapped in quotes) for points not explicitly in JSON (default blue)]\n";
  print "-r [radius for points not explicitly in JSON (default 6)]\n";
  print "-s [svg file; must end in .svg]\n";
	die "\n";
} else {
	my $i = 0;
	while($i<=$#ARGV){
		if ($ARGV[$i] eq '-c'){
			$i++;
			$colorFile = $ARGV[$i];
		} elsif ($ARGV[$i] eq '-f'){
			$i++;
			$defaultColor = $ARGV[$i];
		} elsif ($ARGV[$i] eq '-r'){
      $i++;
      $defaultRadius = $ARGV[$i];
    } elsif ($ARGV[$i] eq '-s'){
			$i++;
			$svgFile = $ARGV[$i];
		} else{
			die "\nIncorrect program usage\n\n";
		}
		$i++;
	}
}

# Convert color array to hash.
sub colorsToHash {
  my @colors = @{$_[0]};
  my $size = $_[1];
  my %colorMap;
  foreach my $color (@colors) {
    my $currSize = exists $color->{'size'} ? $color->{'size'} : $size;
    foreach my $point (@{$color->{'list'}}) {
      %{$colorMap{$point}} = (
        "color" => $color->{'color'},
        "size" => $currSize,
      );
    }
  }
  return %colorMap;
}

# Extract header (until first circle).
sub extractSections {
  my $svg = $_[0];
  my ($header, $points, $tail) = $svg =~ /^(.+?)(<g clip-path="url\(#clip\)" class='points'.+)(<g clip-path="url\(#clip\)"><line class='cross-line'.+)/;
  return ($header, $points, $tail);
}

# Get file name from string.
sub filename {
  my $file = $_[0];
  my ($filename) = $file =~ /([^\/]+).svg/;
  return $filename;
}

# Read file to string.
sub readFileToString {
  my $file = $_[0];

  # Open file and read to string.
  my $string = do {
    local $/ = undef;
    open my $fh, "<", $file or die "could not open $file: $!";
    <$fh>;
  };
  return $string;
}

# Parse JSON file.
sub parseJsonFile {
  my $file = $_[0];

  # Open file and read to string.
  my $jsonString = readFileToString($file);
	return parse_json($jsonString);
}

# Update points.
sub updatePoints {
  my @points = @{$_[0]};
  my %colors = %{$_[1]};
  my $defaultColor = $_[2];
  my $defaultRadius = $_[3];
  my @newPoints;
  foreach my $point (@points) {
    my ($circle, $text) = $point =~ /(<circle.+?\/>).+?(<text.+?<\/text>)/;
    my ($gene) = $text =~ />(.+?)<\/text>/;
    my $color = $defaultColor;
    my $size = $defaultRadius;
    my $name = '';
    if (exists $colors{$gene}) {
      $color = $colors{$gene}{'color'};
      $size = $colors{$gene}{'size'};
      $text =~ s/class='.+?' //g;
      $text =~ s/cursor='.+?' //g;
      $text =~ s/name='.+?' //g;
      $text =~ s/style='visibility: hidden; /style='/g;
      $name = $text;
    }
    $circle =~ s/fill='.+?'/fill='$color'/g;
    $circle =~ s/r='.+?'/r='$size'/g;
    push @newPoints, '<g clip-path="url(#clip)">'. $circle . $name . '</g>';
  }
  return @newPoints;
}

# Get colors.
my @json = parseJsonFile($colorFile);
my @colors = @{$json[0]};
my %colorMap = colorsToHash(\@colors, $defaultRadius);

# Read svg
my $svg = readFileToString($svgFile);
my ($header, $points, $tail) = extractSections($svg);

# Update points.
my @origPoints = $points =~ /(<g.+?<\/g>)/g;
my @newPoints = updatePoints(\@origPoints, \%colorMap, $defaultColor, $defaultRadius);

# Print svg.
my $filename = filename($svgFile);
open my $output, '>', $filename . '_new-colors.svg';
print $output $header;
print $output join '', @newPoints;
print $output $tail;
close $output;

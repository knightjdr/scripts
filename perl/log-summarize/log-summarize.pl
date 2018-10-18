#!/usr/bin/perl

# 18/10/2018

use strict;
use warnings;

use Data::Dumper; # use like this to print an array print Dumper \@array;

# command line parameters
my $folder = '';	# folder with log files.

if ($#ARGV == 0) {
	print "\nTakes a folder of log files and summarizes user numbers by files and total./\n";
  print "\nAlso list the max number of analyses in one day and in one hour".
  print "\nusage:\n $0\n";
  print "-f [folder with log files]\n";
	die "\n";
} else {
	my $i = 0;
	while($i<=$#ARGV){
		if ($ARGV[$i] eq '-f'){
			$i++;
			$folder = $ARGV[$i];
		} else{
			die "\nIncorrect program usage\n\n";
		}
		$i++;
	}
}

# Read files in folder. Remove "." and "..".
sub listFolder {
  my $folder = $_[0];

  opendir my $dir, $folder or die "Could not read folder: $!";
  my @files = readdir $dir;
  closedir $dir;

  # Remove . and .., assuming they are first two elements.
  splice @files, 0, 2;
	return @files;
}

sub avgHash {
  my %hash = %{$_[0]};

  my $sum = 0;
  my $values = 0;
  foreach my $value (values %hash) {
    $sum += $value;
    $values++;
  }
  return $sum / $values;
}

sub maxHash {
  my %hash = %{$_[0]};

  my $max = 0;
  foreach my $value (values %hash) {
    if ($value > $max) {
      $max = $value;
    }
  }
  return $max;
}

# Individual tool usage.
sub toolUsage {
  my $file = $_[0];
  my $folder = $_[1];

  my $total = 0;
  my %unique;

  open my $fh, "<", "$folder/$file" or die "Could not open $folder/$file: $!";
  while(<$fh>) {
    my ($date, $time, $ip) = $_ =~ /([^\s]+) ([^\s]+) - ([^\s]+)/;
    $total++;
    if (!exists $unique{$ip}) {
      $unique{$ip} = 1;
    }
  }
  close $fh;

  my $uniqueUsers = keys %unique;
  return $total, $uniqueUsers;
}

# Total tool usage.
sub totalUsage {
  my @files = @{$_[0]};
  my $folder = $_[1];

  my %days;
  my %hours;
  my $total = 0;
  my %unique;

  foreach my $file (@files) {
    open my $fh, "<", "$folder/$file" or die "Could not open $folder/$file: $!";
    while(<$fh>) {
      my ($date, $time, $ip) = $_ =~ /([^\s]+) ([^\s]+) - ([^\s]+)/;
      my ($hour) = $time =~ /(\d\d):/;
      my $dateHour = $date . "-" . $hour;
      if (exists $days{$date}) {
        $days{$date}++;
      } else {
        $days{$date} = 1;
      }
      if (exists $hours{$dateHour}) {
        $hours{$dateHour}++;
      } else {
        $hours{$dateHour} = 1;
      }
      if (!exists $unique{$ip}) {
        $unique{$ip} = 1;
      }
      $total++;
    }
    close $fh;
  }

  my $avgDay = avgHash(\%days);
  my $avgHour = avgHash(\%hours);
  my $maxDaily = maxHash(\%days);
  my $maxHourly = maxHash(\%hours);
  my $uniqueUsers = keys %unique;
  return $total, $uniqueUsers, $maxDaily, $avgDay, $maxHourly, $avgHour;
}

my @files = listFolder($folder);

# Print out usage information per tool.
print STDOUT "tool\tunique\ttotal\n";
foreach my $file (@files) {
  my ($total, $unique) = toolUsage($file, $folder);
  print STDOUT "$file\t$unique\t$total\n";
}

# Print out usage for all tools.
print STDOUT "unique\ttotal\tdaily\tday\thourly\thour\n";
my ($total, $unique, $daily, $avgDay, $hourly, $avgHour) = totalUsage(\@files, $folder);
print STDOUT "$unique\t$total\t$daily\t$avgDay\t$hourly\t$avgHour\n";

# Configure a Rasbry Pi with [Ansible](https://www.ansible.com/)

In this readme all the procedure to configure and install base software on a Raspberry Pi with Ansible

---

## Summary

[TOC]

## Install os

To install the OS on your SD card, use Raspberry Pi Imager : `sudo apt install rpi-imager` or [download it](https://www.raspberrypi.com/software/)

![Raspberry Pi Imager](imager.png)

Choose your operating system and your SD card

There are many different OS to install on your Raspberry. Here's a small sample:

-   Raspberry Pi OS (64-bit)
-   Raspberry Pi OS (32-bit)
-   Ubuntu Desktop 23.10 (64-bit)
-   Ubuntu Server 23.10 (64-bit)
-   Apertis
-   RISC OS (5.28)
-   ...

We'll use Ubuntu Server

## Setup Ansible

In this section we will create the files needed to configure _Ansible_, noting the [**hosts**](####hosts) which will be used to tell where to perform actions.

### Rasbersible

In a new folder, create the file: `rasbersible`.
it will be used to launch ansible and should look like this:

```bash

#!/bin/bash

set -e
cd "$(cd "$(dirname "$0")"; pwd)"

help () {
   fatal <<HELP_MSG
Usage:

   ./rasbersible XXX

 $0 [ -t sometag ] [ ... ]
HELP_MSG
}

ensure_suitcase () {
   if ! test -f ansible-deps-cache/.versions 2>/dev/null; then
       curl https://raw.githubusercontent.com/epfl-si/ansible.suitcase/master/install.sh | \
           SUITCASE_DIR=$PWD/ansible-deps-cache \
           SUITCASE_ANSIBLE_VERSION=8.3.0 \
           bash -x
   fi
   . ansible-deps-cache/lib.sh
   ensure_ansible_runtime
}

ensure_suitcase
[ "$1" == "--help" ] && help

ansible-playbook -i inventory.yml playbook.yml "$@"


```

### Playbook

Also creates the `playbook.yml` file.

The **playbook** file is used to define what needs to be done when the _./rasbersible_ script is launched. In our case, the objective is to configure the PI for simple use:

```yml
- name: Setup PI
  hosts: all
  gather_facts: no
  roles:
      - name: pi-setup
  tags:
      - setup
```

Explanation of the different elements:

-   ##### hosts:
    The hosts variable is specified in the [`inventory.yml`](###inventory) and corresponds to the tags. It tells **Anisble** which IP to use.
-   ##### roles:
    Roles are used to identify files to be executed.
-   ##### tags:
    tags are widely used in ansible to select specific actions to be executed. This saves time by eliminating repetitive actions. In our case, there's only one tag: **setup**, as only one task is required.

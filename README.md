# Configure a Raspberry Pi with [Ansible](https://www.ansible.com/)

In this readme all the procedure to configure and install base software on a raspberry Pi with Ansible

---

## Summary

-   [Configure a raspberry Pi with Ansible](#configure-a-raspberry-pi-with-ansible)
    -   [Summary](#summary)
    -   [Install os](#install-os)
    -   [Setup Ansible](#setup-ansible)
        -   [Rasbersible](#rasbersible)
        -   [Playbook](#playbook)

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

## How the script works

The script is separated into two distinct roles: **monitoring** and **pi-setup**.

-   **pi-setup** will install essential packages such as _bash_, _git_, _curl_, _etc_.
-   **monitoring** will display various system and network information in a web page.

### Pi-setup

The pi-setup role is divided into 3 configuration files _.yml_ + _main.yml_.

-   **confort.yml :** will install all essential packages with the `sudo apt install <package>` method.
-   **install-docker :** will install, as its name suggests, Docker and Docker-compose.
-   manage-users :\*\*\*\* will create the users present in the `pi-setup-vars.yml` file and configure SSH keys from GitHub.

### Monitoring

Monitoring is divided into three parts.

-   Grafana** will display all collected data on a web page. Like all other parts, Grafana runs in a Docker container on port **:9000\*\*.

-   Prometheus** is the Docker container that will condense all the information recorded by various containers such as _Node Exporter_, _Cadvisor_, and offer it to Grafana, thanks in particular to metrics. Metrics are all available information, often in the form: **<exporter initial><metric name>**. It is these metrics that will be proposed to Grafana via the API accessible on port **:9000\*\*. Prometheus also takes care of storing all data. It will only save the last 2 weeks; this variable can be modified in the parameters.

-   The **Exporter** Docker containers will each collect their own data and send it to Prometheus.

In addition to the **Grafana** and **Prometheus** containers, we need configurations, which is why there are configuration JSON files.

-   The **prometheus_main.yml** will be used to indicate the exporters' ports, as well as their name and _scrape_interval_, which is the time interval for fetching data.

-   **Dashboard** dashboards are JSON files that indicate exactly where all data blocks will be, as well as their graphic format, tables, etc.

-   **Provisioning** these are the files that indicate Grafana's configuration, such as which port to find Prometheus at and how to preload the dashboards.

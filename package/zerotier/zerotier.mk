ZEROTIER_VERSION = 1.2.4
ZEROTIER_SITE = $(call github,zerotier,ZeroTierOne,$(ZEROTIER_VERSION))


define ZEROTIER_BUILD_CMDS
	$(MAKE) $(TARGET_CONFIGURE_OPTS) -C $(@D) 
endef

define ZEROTIER_INSTALL_TARGET_CMDS
	DESTDIR=$(TARGET_DIR) $(MAKE) -C $(@D) install
endef


$(eval $(generic-package))

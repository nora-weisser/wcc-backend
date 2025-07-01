package com.wcc.platform.domain.platform;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Locale;

/** Community available network types. */
public enum SocialNetworkType {
  YOUTUBE,
  GITHUB,
  LINKEDIN,
  INSTAGRAM,
  FACEBOOK,
  TWITTER,
  MEDIUM,
  SLACK,
  MEETUP,
  EMAIL,
  UNKNOWN,
  DEFAULT_LINK;

  @JsonValue
  @Override
  public String toString() {
    return name().toLowerCase(Locale.ENGLISH);
  }
}

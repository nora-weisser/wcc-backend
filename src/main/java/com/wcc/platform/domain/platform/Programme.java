package com.wcc.platform.domain.platform;

import com.wcc.platform.domain.cms.attributes.Card;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Programme {

  String title;

  String description;

  Card card;

  public Programme(final String title, final String description, final Card card) {
    this.title = title;
    this.description = description;
    this.card = card;
  }

  public Programme() {}
}